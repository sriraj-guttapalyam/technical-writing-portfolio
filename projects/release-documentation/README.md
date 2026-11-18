# Python 3.12 compatibility: replace executable lookup

This release-documentation sample covers one real compatibility change: the removal of `distutils` from the Python standard library in Python 3.12. It combines a release notice, a migration procedure, and a regression test.

**Audience:** Maintainers of Python command-line tools and build helpers.  
**Scope:** Code that uses `distutils.spawn.find_executable`. This is not a complete migration guide for packaging or custom build commands.  
**Shows:** A compatibility notice, a scoped migration, and acceptance criteria backed by tests. For conventional release notes, see the [release notes sample](../release-notes/README.md).

## Compatibility notice

Python 3.12 no longer includes `distutils` in the standard library. A helper that imports `find_executable` from that package can fail before its main operation begins. A third-party compatibility package may mask the dependency, so an import that succeeds in one environment does not prove that the application is independent of `distutils`.

For executable lookup, replace `distutils.spawn.find_executable` with `shutil.which`. The replacement is available in the standard library and does not require an additional package for this use case. Do not apply this replacement to unrelated `distutils` APIs.

## Identify affected code

Search application and test source for `distutils` and `find_executable`. If ripgrep is installed, run this command from the application root:

```text
rg -n "distutils|find_executable" --glob "*.py" .
```

Review matches individually. A reference in a migration note is not an active dependency. If the import belongs to a third-party package, check for a compatible release and update through the application's dependency process. Do not edit installed package files as a permanent fix.

This older pattern needs attention:

```python
from distutils.spawn import find_executable

git_path = find_executable("git")
```

## Replace the lookup and handle failure

The following helper returns a resolved path or raises an explicit error. It does not install the requested program and does not execute it.

```python
from shutil import which


def resolve_tool(command: str) -> str:
    resolved = which(command)
    if resolved is None:
        raise FileNotFoundError(f"Executable not found: {command}")
    return resolved
```

At the call site, catch `FileNotFoundError` and show the application's normal dependency message. Do not continue with an unresolved executable name or silently choose a different program.

<!-- pagebreak -->

## Verify the migration

The repository includes [resolve_tool.py](resolve_tool.py) and [test_resolve_tool.py](test_resolve_tool.py). The tests check a known executable and an absent file. They do not depend on Git being installed.

From the repository root, run:

```text
python -m unittest discover -s projects/release-documentation -p "test_*.py"
```

A successful run reports two tests and `OK`. A failure means the migration is not ready for acceptance. Inspect the traceback before changing the test.

```python
def test_existing_executable(self):
    result = resolve_tool(sys.executable)
    self.assertTrue(os.path.samefile(result, sys.executable))

def test_missing_executable(self):
    with tempfile.TemporaryDirectory() as directory:
        missing = str(Path(directory) / "missing-tool-93a1")
        with self.assertRaises(FileNotFoundError):
            resolve_tool(missing)
```

The complete test file includes the imports and test class. This excerpt is not a standalone script.

## Check platform-sensitive behavior

`shutil.which` uses the executable search path and platform rules. Windows also uses `PATHEXT`. Its behavior is not identical to every legacy `find_executable` case, so test the platforms and command names your application actually supports.

| Case | Expected application behavior |
| --- | --- |
| Required tool is installed | Resolve the intended executable and continue. |
| Required tool is absent | Show a clear dependency message and stop the dependent operation. |
| Several installations are on the path | Select the installation required by product policy. Do not assume the first match is acceptable. |
| Tool path contains spaces | Preserve the path as one argument when it is later passed to a process API. |
| Windows executable has an extension | Check resolution with the product's supported command name and environment. |

Finding an executable is not a trust check. Applications with security requirements must also verify that the resolved location is approved before executing it.

## Release acceptance and recovery

Accept the migration after the helper tests and the application's regression tests pass on the supported Python versions and operating systems. Confirm that the affected runtime path no longer imports `distutils`.

If behavior differs, record the command, platform, and expected selection, then correct the compatibility handling. For a deployed regression, follow the application's rollback plan. Restoring the old import under Python 3.12 is not a reliable recovery.

## References

- [Python 3.12 removals](https://docs.python.org/3.12/whatsnew/3.12.html#removed)
- [PEP 632 migration advice](https://peps.python.org/pep-0632/#migration-advice)
- [shutil.which behavior](https://docs.python.org/3.12/library/shutil.html#shutil.which)

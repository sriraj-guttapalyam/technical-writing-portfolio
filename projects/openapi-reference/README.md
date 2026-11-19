# Describe an endpoint in OpenAPI

The [API reference sample](../api-reference/README.md) explains one endpoint for a person. This sample describes the same endpoint for machines: [`openapi.yaml`](openapi.yaml) in OpenAPI 3.0. Tools read it to render reference pages, generate clients, and validate requests. An AI assistant can also read it to find out what a call accepts.

**Audience:** Developers and writers who maintain API descriptions.  
**Shows:** Reusable parameters and schemas, nullable fields, pagination headers, and error responses, with descriptions written for readers and not only for tools.

## What the file covers

| Part | Where it is |
| --- | --- |
| Endpoint and method | `GET /repos/{owner}/{repo}/issues` |
| Path parameters | `Owner` and `Repo`, defined once under `components/parameters` |
| Query parameters | `state`, `labels`, `sort`, `direction`, `since`, `per_page`, `page` with defaults and limits |
| Authentication | Optional bearer token, because public repositories need none |
| Responses | `200` with a `Link` header, `301`, `404`, and `422` |
| Response body | The `Issue` schema, where `body` is nullable and `pull_request` is optional |

## Writing choices

- **Descriptions state behavior, not types.** The type is already in the schema. The description says what a reader cannot infer, such as "Not the same as `id`".
- **Nullable and optional are different.** `body` is always present and can be null. `pull_request` can be absent. Clients treat those cases differently, so the file keeps them apart.
- **Shared definitions are referenced.** `Owner`, `Repo`, `Issue`, and `Error` appear once and are reused with `$ref`. A change in one place updates every use.
- **Examples use a real public repository.** The `github/docs` values work as written.
- **The file says what it is.** The description states that it is a subset written for this portfolio, so nobody mistakes it for the official specification.

## Validate and preview it

The repository check confirms that this README's local links and code fences are valid. It does not parse or lint `openapi.yaml`. Run the repository check from the repository root:

```text
python tools/check_portfolio.py
```

To parse, lint, and render the OpenAPI file, use a dedicated OpenAPI tool. For example, with Node.js installed:

```text
npx @redocly/cli lint projects/openapi-reference/openapi.yaml
npx @redocly/cli preview-docs projects/openapi-reference/openapi.yaml
```

These Redocly commands download a tool and are not part of the repository check or CI workflow. A production repository should pin a reviewed tool version and run the linter in CI.

## References

- [OpenAPI Specification 3.0.3](https://spec.openapis.org/oas/v3.0.3)
- [List repository issues, GitHub REST API](https://docs.github.com/en/rest/issues/issues#list-repository-issues)

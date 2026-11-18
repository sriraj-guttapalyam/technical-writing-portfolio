---
title: Check a Kubernetes deployment rollout
type: task
product: Kubernetes
audience: [operator, support-engineer]
version: "kubectl supported by the target cluster"
summary: Confirm that a deployment rollout finished within two minutes, without changing the deployment.
questions:
  - How long does the rollout check wait?
  - Does a rollout timeout undo the deployment?
  - What do I do if another revision replaced mine?
synonyms: [rollback, deploy status, rollout wait]
prerequisites:
  - Cluster context from the release record
  - Permission to get and watch deployments
related:
  - ../../structured-authoring/README.md
last_reviewed: 2026-09-30
reviewer_role: release owner
---

# Check a Kubernetes deployment rollout

The rollout check confirms that a Kubernetes deployment finished updating. It reads status only and changes nothing.

## Before the rollout check: confirm the cluster context

The rollout check reads whichever cluster is active. Run this command and compare the result with the release record:

```text
kubectl config current-context
```

If the context differs from the release record, stop. Checking the wrong cluster can report success for a release that never reached the right one.

## Run the rollout check for the nginx deployment

This command waits up to two minutes for the `nginx` deployment in the `default` namespace:

```text
kubectl rollout status deployment/nginx --namespace=default --timeout=120s
```

On success, kubectl reports that the deployment successfully rolled out. Record the command, output, context, namespace, and time in the release record.

## What a rollout timeout means

A rollout timeout stops the wait. It does not undo the deployment. The deployment keeps progressing or stays stuck, and the rollout check reports only that it did not finish in time.

Do not run `kubectl rollout undo` or restart workloads as part of this check. Those actions belong to the release team's recovery procedure.

## When another revision replaces the one being checked

By default, the rollout check follows the latest rollout. If a newer rollout starts, the command can switch to it. Compare the active revision with the release record. Do not report success for the wrong revision.

## Rollout check problems and next actions

This table lists what to do when the rollout check for the `nginx` deployment does not finish cleanly.

| Observation | Next action |
| --- | --- |
| Deployment not found | Confirm the cluster context, namespace, and deployment name. |
| Forbidden response | Ask the administrator to check read permissions for the deployment. |
| Timeout | Check deployment conditions and recent events. Confirm that two minutes suits the release before waiting again. |
| Successful rollout, failed application test | Keep the release under investigation and share the application result with the service owner. |

## After a successful rollout: run the application smoke test

A completed rollout means the deployment is up. It does not prove a user transaction works. Run the service's approved application smoke test next, and escalate a failure to the release owner.

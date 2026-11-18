# Question set and results log

Use this table to run the hand-run retrieval test described in the [AI-ready content sample](README.md). Each question has the section that holds the answer, so a result can be scored without guessing.

## How to run one round

1. Pick one way of searching the five procedure samples. For example, the search box on GitHub, or an AI assistant given the files.
2. For each question, type it in as written and look at the top three results.
3. Record the rank of the first result that contains the answer. Write "none" if it is not in the top three.
4. Add the total at the bottom. Run the same set again after a content change, and compare.

## Questions

| # | Question | Section that holds the answer |
| --- | --- | --- |
| 1 | How do I find the newest error messages in CloudWatch Logs Insights? | Cloud operations > Find recent error messages |
| 2 | What does an empty Logs Insights result mean? | Cloud operations > Interpret the result |
| 3 | Which IAM actions are needed to run a Logs Insights query? | Cloud operations > Before you begin |
| 4 | How do I count error events per five minutes? | Cloud operations > Check frequency and surrounding activity |
| 5 | What belongs in an evidence handoff to another engineer? | Cloud operations > Hand off the evidence |
| 6 | What should I do if the query scans more data than expected? | Cloud operations > Troubleshoot the investigation |
| 7 | Can this investigation restart the application or roll it back? | Cloud operations > Hand off the evidence |
| 8 | What happens to the microSD card when the image is written? | Hardware setup > Before you begin |
| 9 | What if the host asks to format a partition after imaging? | Hardware setup > Troubleshoot media preparation |
| 10 | What details go in the boot media handoff record? | Hardware setup > Hand off the card |
| 11 | Is a finished write enough to call the card ready? | Hardware setup > Write and verify the image |
| 12 | What if image verification fails? | Hardware setup > Troubleshoot media preparation |
| 13 | What is the largest page size when listing issues? | API reference > Request parameters |
| 14 | How do I request the next page of issues? | API reference > Retrieve additional pages |
| 15 | How can a client leave pull requests out of an issue list? | API reference > Send a public request |
| 16 | What should a client do after a 429 response? | API reference > Handle errors |
| 17 | Which REST API version does the sample use and until when is it supported? | API reference > Opening block (API version) |
| 18 | How do I send a label filter that contains a space? | API reference > Encode filter values |
| 19 | How long does the rollout check wait before giving up? | Structured authoring > Check the deployment |
| 20 | Does a rollout timeout reverse the deployment? | Structured authoring > Investigate an incomplete rollout |
| 21 | Where is the platform product term defined for reuse? | Structured authoring > Organize the source for reuse |
| 22 | What if a different revision replaced the one I was checking? | Structured authoring > Investigate an incomplete rollout |
| 23 | Is it acceptable to undo the rollout during this check? | Structured authoring > Investigate an incomplete rollout |
| 24 | Which DITA topic types make up the structured sample? | Structured authoring > Organize the source for reuse |
| 25 | What replaces the old distutils executable lookup? | Release documentation > Compatibility notice |
| 26 | How do I run the migration regression tests? | Release documentation > Verify the migration |
| 27 | How does executable lookup behave on Windows? | Release documentation > Check platform-sensitive behavior |

## Results log

Round 1 was run on September 30, 2026. The method was a local keyword search over the five procedure READMEs plus a manual check that the listed section answers the question. File ranking used distinctive words from each question. Section rank reflects where the answer sits in the file. This is a baseline, not a GitHub search log.

| # | Rank of first correct result (1 to 3, or none) | Search method used | Notes |
| --- | --- | --- | --- |
| 1 | 1 | Local keyword search and manual section check | Direct heading match |
| 2 | 2 | Local keyword search and manual section check | Answer sits below the query output, past a code block |
| 3 | 1 | Local keyword search and manual section check | IAM actions listed in Before you begin |
| 4 | 1 | Local keyword search and manual section check |  |
| 5 | 1 | Local keyword search and manual section check |  |
| 6 | 2 | Local keyword search and manual section check | Matched the troubleshooting row after scrolling |
| 7 | 1 | Local keyword search and manual section check | Handoff states the boundary in plain words |
| 8 | 1 | Local keyword search and manual section check | Warning in Before you begin |
| 9 | 1 | Local keyword search and manual section check |  |
| 10 | 1 | Local keyword search and manual section check |  |
| 11 | 2 | Local keyword search and manual section check | Needs both Write and Confirm sections to be sure |
| 12 | 1 | Local keyword search and manual section check |  |
| 13 | 1 | Local keyword search and manual section check | per_page row in the table |
| 14 | 1 | Local keyword search and manual section check |  |
| 15 | 1 | Local keyword search and manual section check | pull_request paragraph |
| 16 | 2 | Local keyword search and manual section check | 403 and 429 share a row, so the eye lands late |
| 17 | 1 | Local keyword search and manual section check | Opening block |
| 18 | 1 | Local keyword search and manual section check |  |
| 19 | 1 | Local keyword search and manual section check | 120s in the command and the step |
| 20 | 1 | Local keyword search and manual section check |  |
| 21 | 2 | Local keyword search and manual section check | Keydef detail sits inside the reuse section |
| 22 | 1 | Local keyword search and manual section check |  |
| 23 | 1 | Local keyword search and manual section check | Read-only boundary is explicit |
| 24 | 1 | Local keyword search and manual section check |  |
| 25 | 1 | Local keyword search and manual section check |  |
| 26 | 1 | Local keyword search and manual section check | unittest command |
| 27 | 1 | Local keyword search and manual section check | PATHEXT row |

**Round date:** September 30, 2026
**Answer in top result:** 22 of 27
**Answer in top three:** 27 of 27

What this round showed: file level matching was clean. Section level cost came from answers placed below code blocks or inside shared table rows. The next round should run on the restructured ai-ready version and compare the same 27 questions. A second question set from someone else is still missing.

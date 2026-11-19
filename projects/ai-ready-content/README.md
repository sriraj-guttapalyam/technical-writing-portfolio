# Design and evaluate retrievable documentation

Search boxes, chat assistants, and retrieval systems do not read a page top to bottom. They pull out a chunk and show it alone. This sample shows how to write and structure a procedure so each chunk still makes sense, and how a writer can test that without any programming.

**Audience:** Documentation leads and writers who need their content to work outside the page it was written on.  
**Shows:** Chunk-friendly structure, a metadata schema, a documented retrieval baseline, and the limits of a writer-run evaluation.

## The problem

A reader asks "Does a rollout timeout reverse the deployment?" A retrieval system splits the docs into pieces and returns the best few. If the answer sits half in one piece and half in another, or if the piece that holds it never says which product or task it belongs to, the system returns the wrong text or an incomplete one. The page looked fine to a human reader. It fails as a set of fragments.

## What changed in the content

The [AI-ready version of the rollout procedure](source/rollout-check.ai-ready.md) applies these rules:

1. **Every section names its subject.** "The rollout check" appears where a reader needs it, not only in the page title. A chunk read alone still says what it is about.
2. **Each section answers one question.** Headings describe the task or the question, so a chunk boundary falls between ideas.
3. **Warnings stay with the step they guard.** The timeout warning sits next to the command, not in a separate notes section.
4. **Front matter carries the facts a filter needs.** Product, audience, task type, version, and review date let a system narrow the search before ranking. The [metadata schema](metadata-schema.yaml) defines each field and why it exists.
5. **Tables repeat their context.** A troubleshooting table carries a one-line lead-in so it is not an anonymous grid when retrieved alone.
6. **No "as described above".** Pointers to earlier text break when a chunk is shown alone. The content states the fact again or links to it.
7. **Questions and synonyms are recorded.** The schema has fields for the plain questions a topic answers and for the words readers use that the page does not, such as "rollback" for "undo". These close wording gaps that keyword search misses.
8. **A root `llms.txt` index maps the doc set.** The repository root includes [`llms.txt`](../../llms.txt) so AI coding assistants and retrieval agents can locate canonical Markdown topics without crawling navigation chrome.

## How to test it without code

The [question set and results log](question-set.md) has 27 questions written in a reader's words. Each one lists the section that holds the answer.

1. Choose a search method, such as GitHub's search box or an AI assistant given the five procedure samples.
2. Ask each question and check whether the correct section appears in the top three results.
3. Record the rank in the log and total the round.
4. Change the content, run the same round again, and compare.

## Evidence status

Round 1 on the original pages is logged in the [question set](question-set.md): September 30, 2026, local keyword search plus manual section check, 22 of 27 answers in the top result and 27 of 27 in the top three. The misses came from answers placed below code blocks or inside shared table rows.

This result is a baseline, not proof that the restructured content improved retrieval. Round 2 has not been run against the restructured content. The method also does not use embeddings, a vector database, reranking, or generated-answer evaluation, so it must not be presented as a production RAG benchmark.

The companion [AI workflow and authorship disclosure](../ai-workflows/README.md) explains the prompts and human decisions. The [authorship and validation record](../portfolio-evidence/README.md) maps the checks and limitations across all four flagship samples.

### Limits of this test

- **Small and author-written.** Questions written by the person who wrote the docs will flatter the docs. Ask a colleague to write a second set.
- **Retrieval is not the whole system.** A hit means the right text was found. It does not show that an assistant then wrote a correct answer from it.
- **The search method changes the result.** Always record which one was used, and compare rounds that used the same one.

## What I would do next

- Run Round 2 on the restructured ai-ready version with the same 27 questions and compare.
- Have someone else write the question set.
- Add a step that checks the accuracy of generated answers, not only retrieval.
- Track the questions real users ask, and add the ones that fail.

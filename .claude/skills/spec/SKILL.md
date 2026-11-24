---
name: spec
description: "Personal task spec workflow: interview the user to pin down requirements, then create or refine docs/tasks/<TASK_ID>-<description>.md (Requirements, Out of Scope, Verification) from TEMPLATE.md. Trigger on '요구사항 정리해줘', 'spec 작성해줘', 'task spec', '태스크 스펙'."
---

# Spec Task

Pin down requirements through an interview and record them as the task file. The task file is the single durable artifact; design happens later in `/impl`. FORBIDDEN to write code or propose class/component structure — requirements only. MUST respond in Korean.

## Arguments
- Task ID or idea: an existing `<TASK_ID>` (e.g., VIBE-123) refines that task file; a free-form idea creates a new one

## Execution Rule

Before starting, print the full step checklist. Mark each step as you go.
MUST continue non-stop through all steps.

Checklist format:
- [ ] Step 1: Locate Task File
- [ ] Step 2: Interview
- [ ] Step 3: Write Task File
- [ ] Step 4: Output

## Process

1. **Locate Task File**
   - If the argument is a task ID matching an existing `docs/tasks/<TASK_ID>*` file: read it — this run refines its gaps
   - If the argument matches the `<TASK_ID>` pattern but no file exists: this run creates a new task with that ID
   - Otherwise (free-form idea): this run creates a new task — assign `<TASK_ID>` as the next number for the project PREFIX
   - For a new task, derive a short kebab-case ASCII `<description>` slug from the idea
   - `Depends on` entries are task IDs. Resolve each entry to `docs/tasks/<entry>*.md` and read it; skip entries whose file does not exist.

2. **Interview**
   - Ask questions one at a time, requirement-side only: goal, edge cases, exclusions, dependencies on other tasks, how to prove it works
   - Continue until every Requirements item is a verifiable statement and Out of Scope / Verification have no unknowns
   - Skip questions the task file or the idea already answers. NEVER re-ask settled points.

3. **Write Task File**
   - Write `docs/tasks/<TASK_ID>-<description>.md` from the interview results in TEMPLATE.md's section order

4. **Output**
   - Report the file path and a few-line summary per section in Korean
   - Suggest next step: run `/impl <TASK_ID>`

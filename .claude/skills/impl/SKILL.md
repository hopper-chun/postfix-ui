---
name: impl
description: "Personal task implementation workflow: read the task file's Requirements, get design approval in chat, create task branch from main, write code and tests, run build/test verification. Trigger on '태스크 구현해줘', 'implement task', 'task implement'."
---

# Implement Task

Implement the given task following the workflow. Design lives in this conversation only — FORBIDDEN to record design in the task file.

## Arguments
- Task ID: passed as the argument (referenced as `<TASK_ID>` below, e.g., VIBE-123)

## Execution Rule

Before starting, print the full step checklist. Mark each step as you go.
Steps marked (approval required) need user confirmation before proceeding.
MUST continue non-stop through all other steps.

Checklist format:
- [ ] Step 1: Read Task File
- [ ] Step 2: Design (approval required)
- [ ] Step 3: Implementation
- [ ] Step 4: Verification
- [ ] Step 5: Output

## Process

1. **Read Task File**
   - Get current branch name: `git rev-parse --abbrev-ref HEAD`
   - If on this task's branch (name contains `<TASK_ID>`): resume mode — changes already on the branch are prior progress
   - If on any other branch than main, stop: "현재 main 브랜치가 아닙니다. 이전 작업을 main에 통합한 뒤 다시 실행해주세요."
   - Find task file with glob pattern `docs/tasks/<TASK_ID>*` and read it
   - If the file does not exist or `## Requirements` is empty: MUST invoke `/spec` first.
   - `Depends on` entries are task IDs. Resolve each entry to `docs/tasks/<entry>*.md` and read it; skip entries whose file does not exist.
   - MUST ask clarifying questions when requirements are unclear

2. **Design** (approval required)
   - Analyze existing code structure and potential impact
   - In resume mode: analyze the branch diff and propose the remaining work only
   - Propose in chat: class/component structure, interfaces and data flow, required changes to existing code, new dependencies if needed
   - For concurrency / packet-parsing / performance-critical code: MUST enumerate edge cases explicitly.
   - Verify: map every requirement item to a design element, confirm no omissions
   - Present the design in Korean. Stop. FORBIDDEN to proceed until user approves.

3. **Implementation**
   - In resume mode: skip the branch setup below and continue from writing code
   - Check for uncommitted changes: `git status`
   - If uncommitted changes exist:
     - If only `docs/tasks/` files are changed, proceed (task file will be carried to new branch)
     - Otherwise: MUST stop and ask user to commit or stash first.
   - If a remote exists (`git remote` non-empty), pull latest: `git pull`
   - Create branch from main: `git checkout -b <type>/<TASK_ID>-<description>`
   - Branch type based on task nature (feat, fix, refactor, etc.)
   - Write code per the approved design following CLAUDE.md conventions
   - Write unit tests using project's existing test framework
   - Testable logic MUST have tests. FORBIDDEN to skip.

4. **Verification**
   - Run project's existing build and test commands
   - Check the result against the task file's `## Verification` items
   - Review code for obvious issues

5. **Output**
   - Report implementation result in Korean
   - FORBIDDEN to proceed to commit until user instructs.

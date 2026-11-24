---
name: commit
description: "Personal task-branch commit workflow: pre-commit build/test verification, task-ID commit message (`<type>: <TASK_ID> ...`), push. Trigger on '커밋해줘', 'commit and push', '커밋 푸시'."
---

# Commit and Push

Commit and push current task changes following the workflow. MUST respond in Korean.

## Execution Rule

Before starting, print the full step checklist. Mark each step as you go.
MUST continue non-stop through all steps.

Checklist format:
- [ ] Step 1: Identify Current Task
- [ ] Step 2: Pre-commit Verification
- [ ] Step 3: Stage Changes
- [ ] Step 4: Commit
- [ ] Step 5: Push

## Process

1. **Identify Current Task**
   - Get current branch name: `git rev-parse --abbrev-ref HEAD`
   - Extract `<TASK_ID>` from branch name (e.g., `feat/VIBE-123-user-model` -> `VIBE-123`)
   - Check for uncommitted changes: `git status`
   - If no uncommitted changes, skip to Step 5 (Push)

2. **Pre-commit Verification**
   - If the working tree is unchanged since a passing build/test run earlier in this session (e.g., right after `/impl` or `/clean`), MUST skip re-running and reference that result
   - Otherwise run project's existing build and test commands
   - If tests fail: MUST report and stop. FORBIDDEN to proceed until user instructs.

3. **Stage Changes**
   - Review changed files: `git status`
   - Stage relevant files: `git add <files>`
   - Exclude unnecessary files

4. **Commit**
   - Format: `<type>: <TASK_ID> <description>`
   - If the branch name has no `<TASK_ID>` (e.g., main): format is `<type>: <description>`
   - MUST be single line. FORBIDDEN: multi-line body, Co-Authored-By trailers.

5. **Push**
   - Check if remote exists: `git remote`
   - If no remote, end
   - Push to remote: `git push -u origin <branch>`

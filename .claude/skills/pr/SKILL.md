---
name: pr
description: "Personal task PR workflow: fill .github/pr_template.md from task file + git diff, preview, create PR with '<type>: <TASK_ID>' title via gh CLI. Invoke via /pr."
---

# Create Pull Request

Create a pull request for current task. MUST respond in Korean.

## Execution Rule

Before starting, print the full step checklist. Mark each step as you go.
Steps marked (approval required) need user confirmation before proceeding.
MUST continue non-stop through all other steps.

Checklist format:
- [ ] Step 1: Identify Current Task
- [ ] Step 2: Read PR Template
- [ ] Step 3: Analyze Changes
- [ ] Step 4: Fill PR Template
- [ ] Step 5: Preview and Confirm (approval required)
- [ ] Step 6: Create PR
- [ ] Step 7: Output

## Process

1. **Identify Current Task**
   - Get current branch name: `git rev-parse --abbrev-ref HEAD`
   - Extract `<TASK_ID>` from branch name
   - Read `docs/tasks/<TASK_ID>*.md` for context

2. **Read PR Template**
   - Read `.github/pr_template.md`

3. **Analyze Changes**
   - Get changed files: `git diff --name-only main...HEAD`
   - Read changed files for context; skip files already read in this session
   - Understand what was implemented

4. **Fill PR Template**
   - Summary: from the task file's `## Requirements` section
   - Changes: from git diff analysis
   - Testing: from test files and the task file's `## Verification` section

5. **Preview and Confirm** (approval required)
   - Show PR title: `<type>: <TASK_ID> <description>`
   - Show filled PR body
   - Stop. FORBIDDEN to proceed until user approves.

6. **Create PR**
   - If PR already exists: MUST ask if user wants to update with `gh pr edit`, then stop or update per user choice.
   ```bash
   gh pr create --base main --head <branch> \
                --title "<type>: <TASK_ID> <description>" \
                --body "<filled template>"
   ```

7. **Output**
   - Report PR URL in Korean
   - Show base -> head branch info


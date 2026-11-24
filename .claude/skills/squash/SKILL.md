---
name: squash
description: "Personal squash-merge workflow: squash-merge the current task branch's PR into main via gh CLI, delete the remote and local branch, then sync main. Trigger on 'squash', 'squash merge', 'main에 머지해줘', '스쿼시'."
---

# Squash Merge

Squash-merge current task branch's PR into main and delete the branch. MUST respond in Korean.

## Execution Rule

Before starting, print the full step checklist. Mark each step as you go.
Steps marked (approval required) need user confirmation before proceeding.
MUST continue non-stop through all other steps.

Checklist format:
- [ ] Step 1: Pre-flight Guards
- [ ] Step 2: Pre-merge Check
- [ ] Step 3: Squash Merge (approval required)
- [ ] Step 4: Output

## Process

1. **Pre-flight Guards**
   - Get current branch name: `git rev-parse --abbrev-ref HEAD`
   - If on `main`, MUST report and stop. FORBIDDEN to squash from main.
   - Find the open PR: `gh pr view <branch> --json number,title,state`. If none, MUST report and stop; instruct user to run `/pr` first.

2. **Pre-merge Check**
   - Check for uncommitted changes: `git status`
   - If uncommitted changes exist, MUST report and stop. FORBIDDEN to squash before committing; instruct user to run `/commit` first.
   - If local commits are not pushed (`git log origin/<branch>..HEAD` non-empty), MUST report and stop.

3. **Squash Merge** (approval required)
   - Ask user: "main에 squash merge할까요?"
     - **Yes**:
       1. `gh pr merge <number> --squash --delete-branch --subject "<PR title>"`
       2. `git checkout main && git pull`
       3. If the local branch still exists: `git branch -D <branch>`
       4. `git fetch --prune`
     - **No**: end

4. **Output**
   - Report merge result in Korean
   - Show merged branch -> main info and the squash commit (`git log -1 --oneline`)

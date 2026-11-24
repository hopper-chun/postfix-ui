# CLAUDE.md - Project Context for AI Agent

## Workflow

### Plan & Execute

- **Plan Mode**: MUST enter plan mode for complex tasks (3+ steps or architectural decisions).
- **Stop on Failure**: When an approach fails, MUST stop and re-plan. FORBIDDEN: pushing through.

### Task Management

Flow: `/spec` -> `/impl` -> `/commit` -> `/pr` -> `/squash` (squash merge + branch delete).

1. **Spec**: MUST write requirements to `docs/tasks/<TASK_ID>-<description>.md` following `docs/tasks/TEMPLATE.md`. MUST check in before starting.
2. **Implement**: MUST get design approval in chat before writing code. FORBIDDEN to record design in the task file. MUST update the task file when requirements change.
3. **Verify**: MUST prove it works per the task file's `## Verification` (build, demo in `src/` or `docs/`).

## Core Principles

- **Wait First**: MUST wait for user instruction. NEVER act autonomously.
- **Simplicity First**: MUST use the simplest solution that works. FORBIDDEN: clever code when straightforward code suffices.
- **No Laziness**: MUST find root causes. FORBIDDEN: temporary fixes, symptom patches.
- **Minimal Impact**: MUST touch only what the task requires. FORBIDDEN: opportunistic refactoring of neighboring code.
- **No Over-Engineering**: MUST implement only current requirements. FORBIDDEN: speculative abstractions, config flags, hooks for hypothetical future needs.

## Project Overview

- **Name**: `@postfix/ui` (npm, public, scope `@postfix`)
- **Description**: Vue 3 UI component / composable library (Tailwind CSS based).
- **Tech stack**: Vue 3, Vite 5 (library mode), Tailwind CSS 3, yarn.

### Module Structure

- `lib/index.js`: library entry; exports components, composables, `filters`, and `install(app, axios)` (axios instance is required)
- `lib/components/`: components by category (element, etc, form, icon, layout, list, overlay, wrapper)
- `lib/composables/`: `use*.js` composables
- `lib/filters/`, `lib/css/`, `lib/assets/`
- `src/`: local playground (`yarn dev`), not shipped
- `docs/`: separate Vue docs app (own `package.json`, `cd docs && yarn dev`), links `@postfix/ui` to `../lib/index.js`; excluded from npm
- `docs/tasks/`: task spec files
- `배포.txt`: npm publish notes

## Build & Test

- Install: `yarn`
- Build: `yarn build` -> `dist/postfix-ui.{es,umd}.js`, `dist/style.css` (`vue` is external)
- Dev: `yarn dev` (playground), `cd docs && yarn dev` (docs)
- No automated tests. Verification = `yarn build` success + manual check in playground or docs.
- Formatter: prettier.
- Publish: bump `version` in `package.json`, then `npm publish --access public`. NEVER publish without explicit user instruction.

## Task ID

- **PREFIX**: `TASK`
- **`<TASK_ID>`**: `<PREFIX>-\d+(-\d+)?`
- **Examples**: `TASK-001`, `TASK-001-02`

## Git Conventions

- **Branch**: `<type>/<TASK_ID>-<description>` (types: feat, fix, refactor, chore, docs, test)
- **Commit**: `<type>: <TASK_ID> <description>`
- **PR**: Use `/pr` skill. Template at `.github/pr_template.md`
- **Merge**: Use `/squash` skill (squash merge via `gh`, then delete branch)

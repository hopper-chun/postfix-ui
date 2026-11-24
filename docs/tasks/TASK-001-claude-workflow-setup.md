# TASK-001: Claude 작업 워크플로 도입 (file-que 기준)

## Depends on
- None

## Requirements
- 루트에 `CLAUDE.md`를 둔다: file-que의 Workflow / Core Principles / Task ID / Git Conventions를 가져오고, Project Overview / Build는 postfix-ui 기준으로 작성한다
- file-que 전용 내용(C++/native addon, Compatibility Rules, Skill Authoring, GitLab MR)은 제외한다
- `.claude/skills/`에 spec -> impl -> commit -> pr -> squash(스쿼시 머지 + 브랜치 삭제) 흐름에 필요한 스킬만 둔다
- `squash` 스킬은 remote가 있는 이 저장소에서 PR을 `gh pr merge --squash --delete-branch`로 머지하고 로컬 브랜치까지 삭제한다
- 스킬이 참조하는 `docs/tasks/TEMPLATE.md`, `.github/pr_template.md`를 둔다

## Out of Scope
- file-que의 나머지 스킬(clean, fix, jira, mr, review-*, tasks, spring-init)
- `.claude/settings.json`, statusline, CI 워크플로
- 라이브러리(`lib/`) / docs 앱 코드 변경

## Verification
- `ls .claude/skills` 결과가 commit, impl, pr, spec, squash 5개
- `CLAUDE.md`, `docs/tasks/TEMPLATE.md`, `.github/pr_template.md` 존재
- `yarn build` 성공 (기존 빌드에 영향 없음)
- 이 태스크 자체를 spec -> impl -> pr -> 스쿼시 머지 -> 브랜치 삭제 순서로 처리

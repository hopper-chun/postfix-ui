# TASK-002: PxInputRadio 외곽선이 라디오 크기로 줄어드는 문제 수정

## Depends on
- None

## Requirements
- 배경: labelFlex 폼(라벨 120px 왼쪽, 입력칸 오른쪽)에서 `PxInputRadio`의 외곽선(`.px-input--field`)이 남은 너비를 채우지 않고 안의 라디오 크기만큼 줄어든다. 같은 폼의 `PxInput`, `PxInputToggle`은 남은 너비를 다 채운다.
- labelFlex 폼, 639px 이상: `PxInputRadio` 외곽선의 왼쪽 / 오른쪽 끝이 같은 폼의 `PxInput`, `PxInputToggle` 외곽선과 같다.
- labelFlex가 아닌 세로 배치(라벨 위, 입력칸 아래)와 639px 미만: 외곽선이 지금처럼 전체 너비를 쓴다.
- 라디오 옵션은 외곽선 안에서 다른 입력칸처럼 왼쪽부터 놓인다. 가운데로 몰리지 않는다.
- 라디오 옵션 사이 간격은 지금 화면과 같다. `.px-inputRadio .px-input--field > label:not(:first-child)` 규칙은 실제 DOM 구조에 맞게 고치거나, 필요 없으면 지운다.
- `PxInputRadio` 안의 `PxRadio`(label 없음)가 labelFlex 안에서 빈 라벨 폭(120px)만큼 오른쪽으로 밀리지 않는다.
- `PxRadio`를 label과 함께 단독으로 쓰는 경우의 렌더링은 바뀌지 않는다.
- helperText는 같은 폼의 다른 입력칸 helperText와 같은 위치(외곽선 아래, 같은 왼쪽 시작점)에 나온다.
- viewMode: 외곽선이 투명하게 처리되고, 정렬은 다른 입력칸의 viewMode와 같다.
- 선택을 바꾸면 `update:modelValue`가 지금처럼 한 번만 나간다.
- 같은 옵션을 가진 `PxInputRadio`가 한 화면에 여러 개 있어도, 라벨을 클릭하면 그 컴포넌트의 라디오만 선택된다.
- `PxInputRadio`의 에러 표시(외곽선)와 `data-testid`는 지금과 같다. 안쪽 라디오가 따로 빨갛게 되지 않고, 같은 `data-testid`가 두 번 나오지 않는다.
- `package.json` 버전을 0.0.70에서 0.0.71로 올린다.

## Out of Scope
- `PxRadio` 자체에 helperText prop을 추가하는 것 (원하면 별도 태스크)
- `PxInputRadio`, `PxRadio` 외 다른 컴포넌트의 스타일 변경
- CHANGELOG 신규 작성 (저장소에 CHANGELOG 파일이 없음)

## Verification
- `yarn build` 성공
- playground(`src/`)나 docs에 라벨 + `PxInput` + `PxInputToggle` + `PxInputRadio`(helperText 포함)를 labelFlex 폼에 나란히 놓은 화면을 만들고 다음을 확인한다.
  - 639px 이상: 세 외곽선의 좌우 끝이 같다. 라디오는 왼쪽부터 놓이고, helperText 위치가 다른 입력칸과 같다.
  - 639px 미만: 라벨이 위, 외곽선이 전체 너비다.
  - viewMode: 다른 입력칸과 정렬이 같다.
  - 라벨이 있는 단독 `PxRadio`의 모습이 수정 전과 같다.
  - 선택을 바꾸면 `update:modelValue`가 한 번 나간다 (콘솔 로그로 확인).
  - 서로 다른 v-model을 쓰는 같은 옵션의 `PxInputRadio` 두 개에서, 두 번째 것의 라벨을 클릭하면 두 번째 것만 바뀐다.
  - 에러 상태에서 외곽선만 빨갛게 되고, `data-testid="<id>"` 요소는 하나다.
- 수정 전 / 후 스크린샷을 남긴다.
- 버전을 0.0.71로 올린다. `npm publish --access public`은 사용자가 그 시점에 명시적으로 지시할 때만 실행한다.

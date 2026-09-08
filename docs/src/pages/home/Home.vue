<template>
  <article class="docs-page docs-home">
    <p class="docs-eyebrow">POSTFIX DESIGN SYSTEM</p>
    <h1>Postfix UI를 빠르게 적용하세요.</h1>
    <p class="docs-lead">
      설치부터 실제 컴포넌트 동작까지 한곳에서 확인하는 내부 가이드입니다.
    </p>

    <div class="mt-[32px] flex gap-[10px]">
      <RouterLink class="docs-primary-link" :to="{ name: 'gettingStarted' }"
        >시작하기</RouterLink
      >
      <RouterLink class="docs-secondary-link" :to="{ name: 'button' }"
        >컴포넌트 보기</RouterLink
      >
    </div>

    <section
      class="mt-[72px] grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[14px] max-[760px]:mt-[48px] max-[760px]:grid-cols-[minmax(0,1fr)]"
    >
      <div class="docs-home-card">
        <strong class="text-[15px] text-[#242832]">실제 동작</strong>
        <p class="mb-[0px] mt-[10px] text-[13px] leading-[1.65] text-[#737a88]">
          배포되는 라이브러리 소스를 연결해 컴포넌트를 직접 확인합니다.
        </p>
      </div>
      <div class="docs-home-card">
        <strong class="text-[15px] text-[#242832]">복사 가능한 예제</strong>
        <p class="mb-[0px] mt-[10px] text-[13px] leading-[1.65] text-[#737a88]">
          서비스 코드에 바로 적용할 수 있는 최소 사용 예제를 제공합니다.
        </p>
      </div>
      <div class="docs-home-card">
        <strong class="text-[15px] text-[#242832]">독립된 환경</strong>
        <p class="mb-[0px] mt-[10px] text-[13px] leading-[1.65] text-[#737a88]">
          문서 의존성과 빌드 결과는 모두 docs 디렉터리 안에서 관리됩니다.
        </p>
      </div>
    </section>
  </article>
</template>

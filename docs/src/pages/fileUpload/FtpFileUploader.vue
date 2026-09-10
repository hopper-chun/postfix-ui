<script setup>
import CodeBlock from '../../components/CodeBlock.vue'
import DocsTable from '../../components/DocsTable.vue'

const basicCode = `<PxFtpFileUploader
  id="ftp-files"
  :ftpFolderSeq="37"
  apiUrl="/api/v1/ftp-file-uploads"
  @onAppend="reloadFileList"
  @onError="handleError"
/>`

const requestCode = `// 선택된 파일마다 각각 실행
PATCH /api/v1/ftp-file-uploads/37
Content-Type: multipart/form-data

// 각 요청이 성공할 때마다 발생
@onAppend="reloadFileList"`

const customClassCode = `<div class="project-ftp-uploader">
  <PxFtpFileUploader id="ftp-assets" :ftpFolderSeq="37" />
</div>

<style>
.project-ftp-uploader .px-fileUpload--label {
  height: 54px;
  border: 2px dashed #ea580c;
  border-radius: 14px;
  background-color: #fff7ed;
  color: #9a3412;
  font-weight: 800;
}
</style>`

const propHeaders = [
  { field: 'name', label: '이름', code: true },
  { field: 'type', label: '타입' },
  { field: 'defaultValue', label: '기본값' },
  { field: 'description', label: '설명' },
]

const propRows = [
  { name: 'id', type: 'String', defaultValue: '필수', description: '내부 파일 input ID' },
  { name: 'ftpFolderSeq', type: 'Number', defaultValue: '-', description: '업로드 대상 FTP 폴더 식별자' },
  { name: 'apiUrl', type: 'String', defaultValue: '/api/v1/file-uploads', description: 'PATCH 요청의 기본 주소' },
  { name: 'disabled', type: 'Boolean', defaultValue: 'false', description: '파일 선택 비활성화' },
  { name: 'label', type: 'String', defaultValue: '-', description: '현재 템플릿에서 사용하지 않음' },
  { name: 'labelHelper', type: 'String', defaultValue: '-', description: '현재 템플릿에서 사용하지 않음' },
  { name: 'viewMode', type: 'Boolean', defaultValue: 'false', description: '현재 템플릿에서 사용하지 않음' },
]

const eventHeaders = [
  { field: 'name', label: '이벤트', code: true },
  { field: 'description', label: '설명' },
]

const eventRows = [
  { name: 'onAppend', description: '파일 하나의 PATCH 요청이 성공할 때마다 발생' },
  { name: 'onError', description: '내부 PxFileUpload의 검사 오류 전달' },
  { name: 'update:cdnPath', description: '이벤트는 선언되어 있지만 현재 구현에서는 발생하지 않음' },
]

const classHeaders = [
  { field: 'className', label: '클래스', html: true },
  { field: 'description', label: '용도' },
]

const classRows = [
  { className: '<code>px-fileUpload</code>', description: '내부 PxFileUpload 최상위' },
  { className: '<code>px-fileUpload--label</code>', description: '파일 선택 버튼' },
  { className: '<code>px-fileUpload--icon</code>', description: '업로드 아이콘' },
  { className: '<code>px-fileUpload--text</code>', description: '업로드 문구' },
]
</script>

<template>
  <article class="docs-page">
    <p class="docs-eyebrow">FILE UPLOAD</p>
    <h1>PxFtpFileUploader</h1>
    <p class="docs-lead">여러 파일을 선택한 뒤 FTP 폴더 식별자가 포함된 주소로 각각 PATCH 요청하는 전용 업로더입니다.</p>

    <section class="docs-section">
      <h2>기본 사용</h2>
      <div class="example-preview">
        <PxFtpFileUploader id="docs-ftp-files" :ftpFolderSeq="37" disabled />
      </div>
      <CodeBlock :code="basicCode" />
      <p class="docs-note">
        내부 PxFileUpload에 <code>multiple</code>이 고정되어 있습니다. 선택한 파일을 한 요청에 합치지 않고 각각 별도의 PATCH 요청으로 전송합니다.
        따라서 목록을 다시 불러오는 작업은 <code>onAppend</code>에서 처리합니다.
      </p>
    </section>

    <section class="docs-section">
      <h2>요청 구조</h2>
      <CodeBlock :code="requestCode" />
    </section>

    <section class="docs-section">
      <h2>Props와 Events</h2>
      <DocsTable :headers="propHeaders" :rows="propRows" />
      <DocsTable class="mt-[14px]" :headers="eventHeaders" :rows="eventRows" />
    </section>

    <section class="docs-section">
      <h2>Class로 스타일 재정의</h2>
      <DocsTable :headers="classHeaders" :rows="classRows" />
      <p class="docs-note">전용 클래스 없이 일반 <code>div</code> 안에 PxFileUpload를 렌더링하므로 내부 PxFileUpload 클래스를 기준으로 재정의합니다.</p>
      <div class="example-preview mt-[20px] pointer-events-none">
        <div class="project-ftp-uploader">
          <PxFtpFileUploader id="docs-ftp-assets" :ftpFolderSeq="37" />
        </div>
      </div>
      <CodeBlock :code="customClassCode" />
    </section>
  </article>
</template>

<style>
.project-ftp-uploader .px-fileUpload--label {
  height: 54px;
  border: 2px dashed #ea580c;
  border-radius: 14px;
  background-color: #fff7ed;
  color: #9a3412;
  font-weight: 800;
}
</style>

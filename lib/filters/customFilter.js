const BANNER_TYPE = {
  BT_MAIN: '메인배너',
  BT_TOP: '탑배너',
  BT_REVIEW: '인플루언서배너',
}

// const APPLY_STATUS = {
//   APPLY: '대기',
//   // REJECT: '탈락',
//   SELECT: '선정',
// }

// const APPEND_FLAG = {
//   Y: '섭외',
//   N: '지원',
// }

const CAMPAIGN_STATUS = {
  // REQUEST: '작성중',
  QUERY: '작성중',
  PAY_ING: '결제대기',
  PAY_END: '결제완료',
  APPLY_ING: '모집중',
  APPLY_END: '모집완료',
  SELECT: '선정중',
  DRAFT_ING: '초안등록중',
  DRAFT_END: '초안등록완료',
  CONTENTS_ING: '컨텐츠등록중',
  CONTENTS_END: '컨텐츠등록완료',
  FINISH: '캠페인완료',
  CANCEL: '취소',
}

const CAMPAIGN_POST_STATUS = {
  // APPLY: '지원',
  APPLY: '미선정', // 원래 지원이였는데 미선정으로 변경
  SELECT: '선정',
  // NON_SELECT: '미선정',
  NON_SELECT: '탈락', // 원래 미선정이였는데 탈락으로 변경
  DRAFT_READY: '초안 대기',
  DRAFT_DONE: '초안 등록',
  DRAFT_CANCEL: '초안 반려',
  DRAFT_CONFIRM: '초안 승인',
  POST_READY: '포스트 대기',
  POST_DONE: '포스트 등록',
  POST_CANCEL: '포스트 반려',
  POST_CONFIRM: '포스트 승인',
  NOSHOW: '노쇼',
  FINISHED: '완료',
}

const POINT_INOUT = {
  PLUS: '적립',
  MINUS: '차감',
}

const POINT_INF_TYPE = {
  JOIN: '가입축하',
  // REVIEW_TEXT: '리뷰 보상',
  // REVIEW_PHONE: '사진리뷰 보상',
  CAMPAIGN: '캠페인 적립',
  ADMIN: '관리자 조정',
  RECOVER: '사용 취소 후 보상',
  WITHDRAW: '출금',
}

const POINT_ADV_TYPE = {
  CHARGE: '충전',
  ADMIN: '관리자 조정',
  RECOVER: '사용 취소 후 보상',
  WITHDRAW: '출금',
}

const POINT_STATUS = {
  0: '적립',
  1: '활성화',
  2: '부분사용중',
  3: '사용완료',
  4: '소멸완료',
}

const POINT_ACTIVE_FLAG = {
  Y: '전환',
  N: '미전환',
}

const POINT_DEPOSIT_STATUS = {
  REQUEST: '입금신청',
  CANCEL: '입금보류',
  DONE: '입금완료',
}

const POINT_WITHDRAWAL_STATUS = {
  REQUEST: '출금신청',
  CANCEL: '출금보류',
  DONE: '출금완료',
}

const STAT_FIELDS = {
  // REQUEST: '요청중'
  QUERY: '작성중',
  PAYMENT: '결제중',
  APPLY: '모집중',
  SELECT: '선정중',
  CONTENTS: '등록/검수중',
  FINISH: '완료',
  CANCEL: '취소',
}

const ANSWER_FLAG = {
  Y: '답변완료',
  N: '답변전',
}

const BOARD_CATEGORY_FAQ = {
  1: '자주묻는질문',
  2: '캠페인신청',
  3: '캠페인선정',
  4: '콘텐츠등록기간',
  5: '콘텐츠등록',
  6: '사이트이용',
}

const BOARD_CATEGORY_QNA = {
  1: '캠페인',
  2: '기타',
}

const BOARD_CATEGORY_INF = {
  1: '블로그',
  2: '유튜브',
  3: '인스타',
}

const NOSHOW_STATUS = {
  NOSHOW_REQ: '노쇼요청',
  NOSHOW_ING: '검토중',
  NOSHOW_HOLD: '보류',
  NOSHOW_REJECT: '거절',
  NOSHOW_DONE: '확정',
}

const NOSHOW_REASON = {
  NOSHOW_NOTHING: '컨텐츠 미등록',
  NOSHOW_MISS_GUIDE: '가이드 미준수',
  NOSHOW_REMOVE: '유지 기간중 삭제',
  NOSHOW_ETC: '기타',
}

const BILL_TYPE = {
  NONE: '미발행',
  TAX_INVOICE: '세금계산서',
  CASH_BILL: '현금영수증',
}

const POINT_FLAG = {
  Y: '지급',
  N: '미지급',
}
const PICKUP_FLAG = {
  Y: '섭외',
  N: '지원',
}

const INF_GENDER = {
  UNKNOWN: '',
  MAN: '남성',
  WOMAN: '여성',
}

export default {
  BANNER_TYPE,
  // APPLY_STATUS,
  // APPEND_FLAG,
  CAMPAIGN_STATUS,
  CAMPAIGN_POST_STATUS,
  POINT_INF_TYPE,
  POINT_ADV_TYPE,
  POINT_INOUT,
  POINT_STATUS,
  POINT_ACTIVE_FLAG,
  POINT_DEPOSIT_STATUS,
  POINT_WITHDRAWAL_STATUS,
  STAT_FIELDS,
  ANSWER_FLAG,
  BOARD_CATEGORY_FAQ,
  BOARD_CATEGORY_QNA,
  BOARD_CATEGORY_INF,
  NOSHOW_STATUS,
  NOSHOW_REASON,
  BILL_TYPE,
  POINT_FLAG,
  PICKUP_FLAG,
  INF_GENDER,
}

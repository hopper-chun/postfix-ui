const USE_FLAG = {
  Y: '사용',
  N: '사용 안 함',
}

const ENABLED_FLAG = {
  Y: '사용',
  N: '사용 안 함',
}

const MAIN_DISPLAY_TYPE = {
  NORMAL: '일반형',
  TAB: '탭형',
}

const DELIVERY_PAID_TYPE = {
  PAID_SENDER: '선불',
  PAID_RECEIVER: '착불',
}

const DELIVERY_CONDITION_TYPE = {
  SAME_CONDITION: '같은 배송비조건별',
  PER_PRODUCT: '상품별',
}

const DELIVERY_FEE_TYPE = {
  FREE: '배송비무료',
  ONCE: '한번만 부과',
  FREE_IF: '조건부무료',
  COUNT_REPEAT: '조건 수량마다 반복부과',
  COUNT_RANGE: '구간 범위부과',
}
const DELIVERY_RANGE_TYPE = {
  RANGE_2: '2개 구간',
  RANGE_3: '3개 구간',
}

const COUPON_PUBLISH_TYPE = {
  AUTO: '자동발급',
  MANUAL: '수동발급',
}
const COUPON_AUTO_TYPE = {
  JOIN: '가입시',
  FIRST_ORDER: '첫주문시',
}
const COUPON_MANUAL_TYPE = {
  DOWNLOAD: '링크다운로드',
  PASSIVE: '운영자수동발급',
}
const COUPON_BENEFIT_TYPE = {
  PERCENT: '정률',
  FIX: '정액',
}
const COUPON_TIMEOUT_TYPE = {
  PERMANENT: '무제한',
  PERIOD: '기간',
  DAY: '일간',
}
const MILEAGE_TYPE = {
  JOIN: '가입축하',
  REVIEW_TEXT: '리뷰 보상',
  REVIEW_PHONE: '사진리뷰 보상',
  ADMIN: '관리자 조정',
  RECOVER: '주문 취소 후 보상',
  ORDER: '주문 사용',
}

const CAMPAIGN_TYPE = {
  PRODUCT: '제품',
  SERVICE: '서비스',
  PLACE: '장소',
  VIRAL: '기자단',
}

const CHANNEL_TYPE = {
  BLOG: '블로그',
  INSTAGRAM: '인스타그램',
  YOUTUBE: '유튜브',
}

const REPLY_FLAG = {
  Y: '답변완료',
  N: '답변대기',
}

const GENDER = {
  WOMAN: '여성',
  MAN: '남성',
  UNKNOWN: '선택안함',
}

const USER_ROLE = {
  USER_INF: '인플루언서',
  USER_ADV: '광고주',
  ADMIN: '매니저',
  SUPER_ADMIN: '수퍼관리자',
}

const POST_GROUP = {
  PG_ORDER: '주문결제',
  PG_DELIVERY: '배송',
  PG_CANCEL: '취소/환불',
  PG_REFUND: '반품교환',
  PG_ETC: '기타',
}

const DISPLAY_FLAG = {
  Y: '진열중',
  N: '진열안함',
}

const FIXED_FLAG = {
  Y: '상단고정중',
  N: '상단고정 안함',
}

const SELLABLE_FLAG = {
  Y: '판매중',
  N: '판매안함',
}
const EVENT_ACTIVE_FLAG = {
  Y: '진행',
  N: '마감',
}

export default {
  USE_FLAG,
  FIXED_FLAG,
  ENABLED_FLAG,
  MAIN_DISPLAY_TYPE,
  DELIVERY_PAID_TYPE,
  DELIVERY_CONDITION_TYPE,
  DELIVERY_FEE_TYPE,
  DELIVERY_RANGE_TYPE,
  COUPON_PUBLISH_TYPE,
  COUPON_AUTO_TYPE,
  COUPON_MANUAL_TYPE,
  COUPON_BENEFIT_TYPE,
  COUPON_TIMEOUT_TYPE,
  MILEAGE_TYPE,
  CAMPAIGN_TYPE,
  CHANNEL_TYPE,
  REPLY_FLAG,
  GENDER,
  USER_ROLE,
  POST_GROUP,
  DISPLAY_FLAG,
  SELLABLE_FLAG,
  EVENT_ACTIVE_FLAG,
}

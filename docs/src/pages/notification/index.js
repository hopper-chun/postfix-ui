import Notification from './Notification.vue'
import SimpleNotification from './SimpleNotification.vue'

export default [
  {
    name: 'notification',
    path: '/notification',
    component: Notification,
    meta: {
      title: 'PxNotification',
      category: 'NOTIFICATION',
      description: '앱 루트에서 전역 알림 상태를 받아 자동으로 표시하는 알림 컴포넌트',
      keywords: [
        'PxNotification',
        'notification',
        '알림',
        '전역 알림',
        'useGlobalNoti',
        'setNoti',
        'clearNoti',
        'noti',
        'expireTime',
        'toast',
      ],
    },
  },
  {
    name: 'simpleNotification',
    path: '/notification/simple',
    component: SimpleNotification,
    meta: {
      title: 'PxSimpleNotification',
      category: 'NOTIFICATION',
      description: 'v-model로 직접 열고 닫으며 제목과 설명을 표시하는 기본 알림 컴포넌트',
      keywords: [
        'PxSimpleNotification',
        'simple notification',
        '알림',
        '토스트',
        'toast',
        'v-model',
        'modelValue',
        'expireTime',
        'title',
        'desc',
        'update:modelValue',
        'px-simpleNotification',
      ],
    },
  },
]

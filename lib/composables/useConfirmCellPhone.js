import { computed, reactive } from 'vue'
import { useError } from '@/composables'

export default (axios, user) => {
  if (!axios || !user) {
    alert('설정이 누락되었습니다')
    return
  }
  const { clearError, causeError, setError } = useError()
  // const { openDialog: openDialog4Alert } = useDialog('GLOBAL_ALERT')

  const local = reactive({
    uuid: '',
    status: 't1', // t1:시작, t2:토큰요청, t3:토큰확인완료
  })

  const makeToken = async (value) => {
    const REGEXP_CELL_PHONE = /^01\d-?\d{3,4}-?\d{4}$/
    if (!REGEXP_CELL_PHONE.test(value)) {
      return causeError({ id: 'cellPhone', msg: '휴대폰 번호가 형식에 맞지 않습니다.' })
    }
    const cellPhone = value.replaceAll('-', '')

    // 로그인항 상태에서 휴대폰번호 변경
    if (user.value.userId && cellPhone === user.value.cellPhone) {
      return causeError({ id: 'cellPhone', msg: '변경할 새로운 휴대폰번호를 입력해주세요.' })
    }

    // alert('토큰이 발송되었습니다. 잠시 기다려 주세요.')

    local.uuid = ''
    local.status = 't1'

    clearError()
    try {
      const res = await axios.post('/api/v1/user-identifys/by-sms', { cellPhone })
      local.uuid = res.data.uuid
      local.status = 't2'
      console.log('res.data', res.data)
      return true
    } catch (ex) {
      setError(ex)
    }
  }

  const confirmToken = async (token) => {
    clearError()
    try {
      if (local.uuid === '' || local.status !== 't2') {
        return
      }
      console.log('confirmToken', token)
      await axios.put(`/api/v1/user-identifys/${local.uuid}`, { token })
      local.status = 't3'

      // openDialog4Alert({
      //   title: '인증완료',
      //   textBody: '휴대폰번호가 인증 되었습니다.',
      // })
    } catch (ex) {
      setError(ex)
    }
  }
  return {
    uuid: computed(() => local.uuid),
    status: computed(() => local.status),
    makeToken,
    confirmToken,
  }
}

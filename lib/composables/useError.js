import { computed, ref, watch, nextTick } from 'vue'
import useElement from './useElement'

import useGlobalNoti from './useGlobalNoti'

const extraErrorCode = {
  fieldName: '',
  errorCodeMap: {},
  systemErrorMessage: '알수 없는 오류가 발생하였습니다. 관리자에게 문의해 주세요.',
}

const setExtraErrorCode = (errorCodeFieldName, errorCodeMap, systemErrorMessage) => {
  extraErrorCode.fieldName = errorCodeFieldName
  extraErrorCode.errorCodeMap = errorCodeMap
  extraErrorCode.systemErrorMessage = systemErrorMessage || extraErrorCode.systemErrorMessage
}

const state = ref({
  id: '',
  msg: '',
})

export default (id, element) => {
  const { setNoti, clearNoti } = useGlobalNoti()

  useElement(id, element)

  const clearError = (id) => {
    if (id && id !== state.value.id) {
      return
    }
    state.value.id = ''
    state.value.msg = ''

    clearNoti()
  }

  const causeError = ({ id, msg }) => {
    state.value.id = id
    state.value.msg = msg

    // console.log('state', state)

    if (state.value.id === 'system') {
      setNoti({ title: state.value.id, description: state.value.msg })
    }
  }

  const setError = (ex) => {
    // if (ex.response?.data?.errorCode) {
    //   causeError({ id: ex.response.data.schemaPath, msg: t(`errorCode_${ex.response?.data?.errorCode}`) })
    if (extraErrorCode.fieldName && ex?.response?.data?.[extraErrorCode.fieldName]) {
      causeError({
        id: ex.response.data.schemaPath || 'system',
        msg: extraErrorCode.errorCodeMap[ex.response.data[extraErrorCode.fieldName]] || extraErrorCode.systemErrorMessage,
      })
    } else if (ex?.response?.data?.schemaPath) {
      state.value.id = ex.response.data.schemaPath
      state.value.msg = ex.response.data.message
      causeError({ id: ex.response.data.schemaPath, msg: ex.response.data.message })
    } else {
      console.error(ex)

      // 401 인증 에러면 시스템 에러로 취급 안한다
      if (ex.response.status === 401) {
        return
      }

      causeError({ id: 'system', msg: extraErrorCode.systemErrorMessage })

      // setNoti({ title: state.value.id, description: state.value.msg })
      // console.log('systemErrorState', systemErrorState)
    }
  }

  const error = computed(() => {
    // if (id && id.value && state.value.id && id.value === state.value.id) {
    if (id && id.value && state.value.id) {
      // 완전히 일치하거나, 하위 구분자 '/'를 포함한 채로 같다면
      if (id.value === state.value.id || (id.value.indexOf('/') !== -1 && state.value.id.startsWith(id.value))) return state.value.msg
    }
    return ''
  })

  const rootRef = ref(null)

  watch(error, (value) => {
    if (value && element && element.value) {
      // nextTick 없이 그냥 focus를 호출하면... 나중에 focus를 잃을때 재진입이 일어난다. 이유는 모르겠다.
      nextTick(() => {
        element.value.focus()

        // 2023-08-11 천희완 - focus만 줬더니 NAVBAR가 absolute로 떠있는 애들한테 가려져서 가운데로 이동시키게 했다
        element.value.scrollIntoView({
          block: 'center',
        })
      })
    }
  })

  return {
    rootRef,
    error,
    globalError: computed(() => state.value),
    clearError,
    causeError,
    setError,
    setExtraErrorCode,
  }
}

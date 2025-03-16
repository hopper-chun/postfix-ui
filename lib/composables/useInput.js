import { readonly, ref, watch } from 'vue'
import useError from '@/composables/useError'
import useFunctionRef from '@/composables/useFunctionRef'
// import _ from 'lodash'

export default (id, modelValue, format, emit) => {
  const isFocused = ref(false)
  const localValue = ref(format.value(modelValue.value))
  const { clearError } = useError()

  watch(
    () => [modelValue.value, isFocused.value],
    () => {
      localValue.value = isFocused.value ? modelValue.value : format.value(modelValue.value)
    }
  )

  const handleInput = ($event, options) => {
    const numberOnly = options?.numberOnly || undefined
    const maxCount = options?.maxCount || undefined
    const inputFilter = options?.inputFilter || undefined
    const maxLength = options?.maxLength || undefined

    let value = $event.target.value

    // 2025-03-14 Copy&Paste 할때 공백,줄내림, 탭등을 trim 해야 한다
    if ($event.inputType === 'insertFromPaste') {
      value = value.trim()
    }

    if (maxLength) {
      // input 태그에 maxlength attr이 비정상적으로 작동해서 궂이궂이 여기서 제대로 잘라줘야 함
      value = value.slice(0, maxLength)
    }

    if (inputFilter) {
      value = value.replace(new RegExp(inputFilter, 'g'), '')
      // console.log('--', value)
    }

    // number는 정수 (float는 나중에 추가해야 한다)
    if (numberOnly) {
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/
      // 한글, 영문 체크
      if (reg.exec(value) !== null) {
        value = value.replace(/[^-0-9\.]/g, '')
      }
      value = parseFloat(parseFloat(value).toFixed(2))
      // .... 만 입력하게 될 경우 체크
      if (isNaN(value)) {
        value = 0
      }

      // 뭔가 입력이 되고 있었고 마지막이 .로 끝나면 .을 붙여준다. 안그러면 소수점을 입력할수가 없다
      if ($event.target.value.length > 0 && $event.target.value.length - 1 === $event.target.value.indexOf('.')) {
        value += '.'
      }
    }
    // $event.target.value = value
    // localValue.value = value
    // emit('update:modelValue', value)

    // 임시로 맥 nbsp 제거하는 코드
    if (numberOnly && maxCount && value >= maxCount) {
      value = maxCount
    }

    const temp = numberOnly ? value : value.replace(//g, '')
    $event.target.value = temp
    localValue.value = temp

    emit('update:modelValue', temp)

    clearError(id.value)
  }

  const handleHashtags = ($event, isHashtag) => {
    // isHashtag = true 일 경우 ['#테그', '#테그'] -> ['#테그'] 중복제거
    // 입력값.trim() 이 빈 공백일 경우에는 공백으로 표시.
    // if (isHashtag) {
    //   let value = $event.target.value
    //   const duplHashtags = _.uniq(
    //     value
    //       .split('#')
    //       .map((hashtag) => hashtag.trim())
    //       .filter((hashtag) => !!hashtag)
    //   )
    //   // 테그를 입력한 경우에만 제일 앞자리에 #을 붙인다.
    //   if (value.trim() !== '') {
    //     $event.target.value = '#' + duplHashtags.join(' #').concat(' ')
    //   }
    // }
  }

  const handleFocus = () => {
    isFocused.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
    emit('onBlur')
  }

  // 추후 해당 기능 정의 필요시 사용한다.
  const handleFocusout = () => {}
  const handleKeyupPress = () => {}

  return {
    isFocused: readonly(isFocused),
    localValue,
    handleInput,
    handleFocus,
    handleBlur,
    handleHashtags,
    handleFocusout,
    handleKeyupPress,
  }
}

import _ from 'lodash'
import validator from 'validator'
import { unref } from 'vue'
import useError from './useError'

const useValidate = (rules, local_, local2_) => {
  const { causeError } = useError()
  const validate = () => {
    const local = unref(local_)
    const local2 = unref(local2_)

    for (const key in rules.value) {
      const validates = rules.value[key]
      // const target = local[key] || local2?.[key]
      const target = _.get(local, key) || _.get(local2, key)

      for (const v in validates) {
        const validate = validates[v]
        // console.log('validate', v, validate, key)

        // 2023.08.14 천희완 / 기존 requiredIf 를 폐기한다.
        if (validate.conditionIf && !validate.isDependent(local)) {
          // console.log('테스트 안해도 대')
          continue
        }

        // if (validate.requiredIf) {
        //   if (validate.dependentValue) {
        //     if (validate.dependentValue === local[validate.requiredIf] || validate.dependentValue === local2?.[validate.requiredIf]) {
        //       if (validator.isEmpty(local[validate.requiredIf] || local2?.[validate.requiredIf] || '')) {
        //         continue
        //       }
        //     } else {
        //       continue
        //     }
        //   } else {
        //     if (validator.isEmpty(local[validate.requiredIf] || local2?.[validate.requiredIf] || '')) {
        //       continue
        //     }
        //   }
        // }

        if (validate.sameAs) {
          if (local[validate.sameAs] === local2?.[key]) {
            continue
          }
          causeError({ id: key, msg: validate.error })
          return false
        }

        if (validate.requiredUnless) {
          if (!validator.isEmpty(local[validate.requiredUnless] || local2?.[validate.requiredIf] || '')) {
            continue
          }
        }
        if (validate.imageArrayRequiredIf) {
          if (validator.isEmpty(local[validate.imageArrayRequiredIf] || local2?.[validate.imageArrayRequiredIf] || '')) {
            continue
          }
        }

        if (!validate.test(target)) {
          causeError({ id: key, msg: validate.error })
          return false
          // return { key, message: validate.error }
        }
      }
    }
    return true
  }
  return {
    validate,
  }
}

const required = {
  test: (value) => {
    return !!value
  },
  error: `반드시 입력해야 합니다`,
}

const email = {
  test: (value) => {
    if (!value) {
      return true
    }
    return validator.isEmail(value)
  },
  error: `올바른 이메일 형식이 아닙니다`,
}

// const requiredIf = (dependentField, dependentValue) => ({
//   test: (value) => {
//     return !!value
//   },
//   error: `반드시 입력해야 합니다`,
//   requiredIf: dependentField,
//   dependentValue,
// })

// const requiredIf = (dependentField, condition) => ({
//   test: (value) => {
//     return !!value
//   },
//   error: `반드시 입력해야 합니다`,
//   isDependent: (target) => {
//     // console.log('target', target, dependentField, condition)
//     return target[dependentField] === condition
//   },
//   conditionIf: true,
// })

const conditionIf = (rule, dependentField, condition) => ({
  ...rule,
  isDependent: (target) => {
    return target[dependentField] === condition
  },
  conditionIf: true,
})

const requiredMsg = (errorMessage) => ({
  test: (value) => {
    return !!value
  },
  error: errorMessage,
})

const sameAs = (dependentField) => ({
  test: (value) => {
    return !!value
  },
  error: `일치하지 않습니다`,
  sameAs: dependentField,
})

const requiredUnless = (dependentField) => ({
  test: (value) => {
    return !value
  },
  error: `반드시 입력해야 합니다`,
  requiredUnless: dependentField,
})

const strLength = (len) => ({
  test: (value) => {
    if (!value) return true

    return validator.isLength(value, { min: len, max: len })
  },
  error: `${len}자여야 합니다`,
})

const minLength = (min) => ({
  test: (value) => {
    if (!value) return true

    return validator.isLength(value, { min })
  },
  error: `최소 ${min}자 이상이어야 합니다`,
})

const maxLength = (max) => ({
  test: (value) => {
    if (!value) return true

    return validator.isLength(value, { max })
  },
  error: `최대 ${max}자 이하여야 합니다`,
})

const integer = {
  test: (value) => {
    return !isNaN(parseInt(value)) && isFinite(value)
    // return Number.isInteger(value)
  },
  error: `정수여야 합니다`,
}

const numeric = {
  test: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },
  error: `양의 실수 혹은 음의 실수여야 합니다`,
}

const arrayRequired = {
  test: (value) => {
    return value.length >= 1
  },
  error: `1건 이상 등록해 주세요`,
}

const imageArrayRequired = {
  test: (value) => {
    return value.length >= 1
  },
  error: `플러스(+)버튼을 눌러 이미지를 업로드 해 주세요`,
}

const imageArrayRequiredIf = (dependentField) => ({
  test: (value) => {
    return value.length >= 1
  },
  error: `플러스(+)버튼을 눌러 이미지를 업로드 해 주세요`,
  imageArrayRequiredIf: dependentField,
})

const isUrl = (option) => ({
  test: (value) => {
    return validator.isURL(value, option)
  },
  error: `올바른 url 형식으로 입력해 주세요`,
})

const cellPhone = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_CELL_PHONE = /^01\d-?\d{3,4}-?\d{4}$/

    return REGEXP_CELL_PHONE.test(value)
  },
  error: `올바른 휴대폰 번호 형식이 아닙니다`,
}

const zeroCellPhone = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_CELL_PHONE = /^0?1\d-?\d{3,4}-?\d{4}$/

    return REGEXP_CELL_PHONE.test(value)
  },
  error: `올바른 휴대폰 번호 형식이 아닙니다`,
}

const phone = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_PHONE = /^((\d{2,3}-?\d{3,4}-?\d{4})|(\d{4}-?\d{4})){1}$/

    return REGEXP_PHONE.test(value)
  },
  error: `올바른 전화번호 형식이 아닙니다`,
}

const domain = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_DOMAIN = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+(?:\:[0-9]{1,})*$/

    return REGEXP_DOMAIN.test(value)
  },
  error: `올바른 도메인 형식이 아닙니다`,
}

const businessNo = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_BUSINESS_NO = /^[0-9]{3}-?[0-9]{2}-?[0-9]{5}$/

    return REGEXP_BUSINESS_NO.test(value)
  },
  error: `10자리 숫자로 입력해 주세요`,
}

const corporationNo = {
  test: (value) => {
    if (!value) {
      return true
    }

    const REGEXP_CORPORATION_NO = /^([0-9]{6})\-?([0-9]{7})$/

    return REGEXP_CORPORATION_NO.test(value)
  },
  error: `올바른 형식이 아닙니다`,
}

useValidate.rules = {
  required,
  email,
  integer,
  numeric,
  arrayRequired,
  imageArrayRequired,
  cellPhone,
  zeroCellPhone,
  phone,
  domain,
  businessNo,
  corporationNo,
  imageArrayRequiredIf,
  isUrl,
  conditionIf,
  requiredUnless,
  strLength,
  minLength,
  maxLength,
  sameAs,
  requiredMsg,
}

export default useValidate

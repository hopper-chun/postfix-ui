import { ref } from 'vue'
import FormWrapper from '@/components/layout/FormWrapper.vue'
import FormWrapperAlt from '@/components/layout/FormWrapperAlt.vue'

const defaultTheme = ref({
  fontSize: 'text-[14px]',
  subFontSize: 'text-[12px] leading-[160%]',
  text: {
    xs: 'text-[12px]',
    sm: 'text-[14px]',
    base: 'text-[16px]',
    lg: 'text-[20px]',
    xl: 'text-[24px]',
    color: 'text-black',
  },
  leading: 'leading-[1.2]',
  paddingX: 'px-[16px]',
  height: 'h-[48px]',
  radius: 'rounded-[8px]',
  bgColor: 'bg-white',
  borderColor: 'border-gray-300',
  border: 'border',
  hover: 'hover:brightness-120',
  duration: 'duration-200',
  disabled: 'bg-gray-200',
  primary: {
    text: 'text-[#00A3FF]',
    bg: 'bg-[#00A3FF]',
    bgLite: 'bg-[#E6F6FF]',
    border: 'border-[#00A3FF]',
  },
  error: {
    text: 'text-red-700',
    textLite: 'text-red-100',
    bg: 'bg-red-600',
    bgLite: 'bg-red-100',
    border: 'border-red-500 border focus:border-red-500 focus:ring-red-500',
  },
  gap: {
    x: 'gap-x-[8px]',
    sx: 'space-x-[8px]',
    y: ' gap-y-[8px]',
    sy: 'space-y-[8px]',
    all: 'gap-[8px]',
  },
  dark: {
    textColor: 'text-white',
    bgColor: 'bg-black',
    borderColor: 'border-white',
  },
  focus: 'focus:border focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]',
  placeholder: 'placeholder-[#A1A1AA]',
  label_fontSize: 'text-[14px]',
  label_fontColor: 'text-black',
  requiredColor: 'bg-red-500',
  select_paddingY: 'py-[8px]',
  select_optionFontSize: 'text-[14px]',
  select_optionHover: 'hover:bg-[#E6F6FF] hover:text-[#00A3FF]',
  select_optionSelected: 'bg-[#00A3FF] text-white',
  select_optionBorder: 'border',
  select_maxHeight: 'max-h-[300px]',
  select_marginTop: 'mt-[4px]',
  textarea_height: 'h-[100px]',
  textarea_paddingY: 'py-[8px]',
  formWrapper: () => FormWrapper,
})

export default () => {
  const setTheme = (styleObj) => {
    for (const property in defaultTheme.value) {
      if (typeof styleObj[property] === 'object') {
        for (const SeparateObj in styleObj[property]) {
          defaultTheme.value[property][SeparateObj] = styleObj[property][SeparateObj]
        }
      } else if (styleObj[property]) {
        defaultTheme.value[property] = styleObj[property]
      }
    }
  }

  return { defaultTheme, setTheme }
}

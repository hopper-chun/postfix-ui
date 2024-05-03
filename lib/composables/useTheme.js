import { computed, unref } from 'vue'
import useThemeDefault from './useThemeDefault'

export default (styleObj) => {
  const { defaultTheme } = useThemeDefault()

  const theme = computed(() => {
    const obj = {
      fontSize: defaultTheme.value.fontSize,
      subFontSize: defaultTheme.value.subFontSize,
      text: {
        xs: defaultTheme.value.text.xs,
        sm: defaultTheme.value.text.sm,
        base: defaultTheme.value.text.base,
        lg: defaultTheme.value.text.lg,
        xl: defaultTheme.value.text.xl,
        color: defaultTheme.value.text.color,
      },
      leading: defaultTheme.value.leading,
      paddingX: defaultTheme.value.paddingX,
      height: defaultTheme.value.height,
      radius: defaultTheme.value.radius,
      bgColor: defaultTheme.value.bgColor,
      borderColor: defaultTheme.value.borderColor,
      border: defaultTheme.value.border,
      labelWidth: null,
      hover: defaultTheme.value.hover,
      duration: defaultTheme.value.duration,
      disabled: defaultTheme.value.disabled,
      primary: {
        text: defaultTheme.value.primary.text,
        bg: defaultTheme.value.primary.bg,
        border: defaultTheme.value.primary.border,
      },
      error: {
        text: defaultTheme.value.error.text,
        textLite: defaultTheme.value.error.textLite,
        bg: defaultTheme.value.error.bg,
        bgLite: defaultTheme.value.error.bgLite,
        border: defaultTheme.value.error.border,
      },
      gap: {
        x: defaultTheme.value.gap.x,
        sx: defaultTheme.value.gap.sx,
        y: defaultTheme.value.gap.y,
        sy: defaultTheme.value.gap.sy,
        all: defaultTheme.value.gap.all,
      },
      dark: {
        textColor: defaultTheme.value.dark.textColor,
        bgColor: defaultTheme.value.dark.bgColor,
        borderColor: defaultTheme.value.dark.borderColor,
      },
      focus: defaultTheme.value.focus,
      placeholder: defaultTheme.value.placeholder,
      label_fontSize: defaultTheme.value.label_fontSize,
      label_fontColor: defaultTheme.value.label_fontColor,
      requiredColor: defaultTheme.value.requiredColor,
      select_paddingY: defaultTheme.value.select_paddingY,
      select_optionFontSize: defaultTheme.value.select_optionFontSize,
      select_optionHover: defaultTheme.value.select_optionHover,
      select_optionSelected: defaultTheme.value.select_optionSelected,
      select_optionBorder: defaultTheme.value.select_optionBorder,
      select_maxHeight: defaultTheme.value.select_maxHeight,
      select_marginTop: defaultTheme.value.select_marginTop,
      textarea_height: defaultTheme.value.textarea_height,
      textarea_paddingY: defaultTheme.value.textarea_paddingY,
      formWrapper: defaultTheme.value.formWrapper,
    }

    if (!styleObj) {
      return obj
    }
    const styles = unref(styleObj)
    for (const property in styles) {
      if (typeof styles[property] === 'object') {
        for (const SeparateObj in styles[property]) {
          obj[property][SeparateObj] = styles[property][SeparateObj]
        }
      } else if (styles[property] !== '') {
        obj[property] = styles[property]
      }
    }
    return obj
  })

  return theme
}

const InputExample = {
  number: `
<RmInput v-model="inputNumber" :numberOnly="true" label="NumberOnly"></RmInput>

<RmInput v-model="inputNumber" :numberOnly="true" label="NumberOnly with unit" unit="원"></RmInput>`,
  password: `
<RmInput
  v-model="inputValue"
  label="input for password"
  placeholder="enter your password"
  type="password"
  :showPassword="true"
  :clear="true">
</RmInput>`,
  icon: `
<RmInput v-model="inputValue" label="input with Icon" :inputIcon="true" placeholder="enter the text">
   <template #inputIcon>
    <IconCheck class="w-[12px] text-gray-400"></IconCheck> 
   </template>
</RmInput>`,
  helperText: `
<RmInput
  v-model="inputValue"
  label="input with Helper text"
  helperText="this is helper text (+icon)"
  :helperIcon="true"
  placeholder="enter the text">
  <template #helperIcon>
   <IconCheck class="w-[12px] text-gray-400"></IconCheck>
  </template>
</RmInput>`,
}

const textarea = `not yet`

const people = [
  {
    id: 1,
    name: 'W2ade Coop12e124r 22Wade Co29890o21er W22ade 22Cooper Wade8 22 1Wade Cooper 2ade C22ooper Wad11e 124Cooper ',
    username: '@wadecooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Arlene Mccoy',
    username: '@arlenemccoy',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Devon Webb',
    username: '@devonwebb',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Tom Cook',
    username: '@tomcook',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Tanya Fox',
    username: '@tanyafox',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 6,
    name: 'Hellen Schmidt',
    username: '@hellenschmidt',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 7,
    name: 'Caroline Schultz',
    username: '@carolineschultz',
    avatar:
      'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Mason Heaney',
    username: '@masonheaney',
    avatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Claudie Smitham',
    username: '@claudiesmitham',
    avatar:
      'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 10,
    name: 'Emil Schaefer',
    username: '@emilschaefer',
    avatar:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    avatar_changed:
      'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const selectDesign = {
  default: `
  <template>
  <div ref="my">
    <div class="relative select-none">
      <RmLabel
        :label="label"
        :labelFontSize="theme.label_fontSize"
        :labelFontColor="theme.label_fontColor"
        :labelHelper="labelHelper"
        :required="required"
        :id="id"
      ></RmLabel>
      <div class="relative">
        <div
          ref="rootRef"
          :id="id"
          @click="handleOpen"
          class="relative flex items-center pr-[42px] focus:outline-none focus:ring-1"
          :class="[
            theme.height,
            theme.border,
            theme.radius,
            theme.paddingX,
            disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
            !error ? \`\${theme.borderColor} focus:border-primary-500 focus:ring-primary-500\` : 'border-red-300 focus:border-red-500 focus:ring-red-500',
            label ? 'mt-[4px]' : '',
          ]"
          tabindex="0"
        >
          <span
            class="leading-[22px] absolute pr-[32px] inset-x-0 truncate"
            :class="[theme.fontSize, theme.paddingX, localValue ? theme.text.color : 'text-[#A3A3A3]']"
          >
            <slot name="header" :localValue="localValue">
              {{ optionsLabel(localValue) || defaultLabel }}
            </slot>
          </span>

          <div class="absolute inset-y-0 right-[10px] flex items-center justify-center">
            <slot name="expand">
              <IconChevronDown class="w-[18px]"></IconChevronDown>
            </slot>
          </div>
        </div>
        <transition
          enter-active-class="transition duration-100 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="SCROLL inset-x-0 absolute top-[100%] z-10 w-full overflow-hidden overflow-y-auto"
            :class="[theme.select_maxHeight, theme.select_marginTop, theme.select_optionBorder, theme.bgColor, theme.borderColor, theme.radius]"
          >
            <div
              v-for="option in options"
              @click="handleSelect(option)"
              class="flex relative cursor-default items-center justify-between leading-[22px] pr-[32px]"
              :class="[
                theme.paddingX,
                theme.select_paddingY,
                theme.select_optionFontSize,
                theme.select_optionHover,

                optionsLabel(localValue) === optionsLabel(option) ? theme.select_optionSelected : '',
              ]"
            >
              <slot name="option" :option="option">
                <span class="truncate">
                  {{ optionsLabel(option) }}
                </span>
              </slot>
              <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="flex right-[10px] absolute items-center justify-center">
                <slot name="checked">
                  <iconCheck class="w-[18px]"></iconCheck>
                </slot>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>`,
  monolithic: `
  <template>
  <div ref="my">
    <div class="relative select-none">
      <formWrapperA
        :labelWidth="theme.labelWidth"
        :label="label"
        :labelFontSize="theme.label_fontSize"
        :labelFontColor="theme.label_fontColor"
        :labelHelper="labelHelper"
        :required="required"
        :id="id"
      >
        <div class="relative">
          <div
            ref="rootRef"
            :id="id"
            @click="handleOpen"
            class="this1231312312313 relative flex items-center pr-[42px] focus:outline-none focus:ring-0 border"
            :class="[
              isOpen ? 'border-b-0' : '',
              theme.height,
              theme.paddingX,
              disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
              !error ? \`\${theme.borderColor} focus:border-primary-500 focus:ring-primary-500\` : 'border-red-300 focus:border-red-500 focus:ring-red-500',
              label ? 'mt-[4px]' : '',
            ]"
            tabindex="0"
          >
            <span class="leading-[22px] absolute inset-0" :class="[theme.fontSize, theme.paddingX, localValue ? theme.text.color : 'text-[#A3A3A3]']">
              <div class="flex-1 h-full flex items-center" :class="isOpen ? 'border-b ' : ''" :style="\`padding-right:\${expandWidth};\`">
                <div class="truncate">
                  <slot name="header" :localValue="localValue">
                    {{ optionsLabel(localValue) || defaultLabel }}
                  </slot>
                </div>
              </div>
            </span>

            <div class="absolute inset-y-0 right-[10px] flex items-center justify-center" ref="expandSlot">
              <slot name="expand">
                <IconChevronDown class="w-[18px]"></IconChevronDown>
              </slot>
            </div>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-in"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="isOpen"
              class="SCROLL inset-x-0 absolute top-[100%] z-10 w-full border-t-0 border overflow-hidden overflow-y-auto"
              :class="[theme.select_maxHeight, theme.select_optionBorder, theme.bgColor, theme.borderColor]"
            >
              <div
                v-for="(option, index) in options"
                @click="handleSelect(option)"
                class="flex relative cursor-default items-center overflow-hidden justify-between leading-[22px]"
                :class="[
                  theme.paddingX,
                  theme.select_optionFontSize,
                  theme.select_optionHover,

                  optionsLabel(localValue) === optionsLabel(option) ? theme.select_optionSelected : '',
                ]"
              >
                <div
                  class="w-full"
                  :class="[index === options.length - 1 ? '' : 'border-b', theme.select_paddingY]"
                  :style="[optionsLabel(localValue) === optionsLabel(option) ? \`padding-right:\${checkedWidth};\` : '']"
                >
                  <div class="truncate">
                    <slot name="option" :option="option">
                      <span>
                        {{ optionsLabel(option) }}
                      </span>
                    </slot>
                  </div>
                </div>
                <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="flex right-[10px] absolute items-center justify-center" ref="checkedSlot">
                  <slot name="checked">
                    <iconCheck class="w-[18px]"></iconCheck>
                  </slot>
                </span>
              </div>
            </div>
          </transition>
        </div>
      </formWrapperA>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>`,
}

const options01 = `<RmSelect label="demo" id="Select_01" v-model="demo" :options="['사람', '사물', '사랑']"></RmSelect>
<RmSelect label="demo" id="Select_01" v-model="demo" 
:options="[{id: 001, name:1번},{id: 002, name:2번}, {id: 003, name:3번}]" 
:optionsLabel="(option) => option.name" :optionsValue="(option) => option.id"></RmSelect>
`
const options02 = `const people = [{
  id: 1,
  name: 'Wade Cooper',
  username: '@wadecooper',
  avatar:
    'https://images.unsplash.com/photo-1491528323818-fdd1faba...',
}, ... ]
<RmSelect
label="..."
  ... >
<template #header="{ localValue }">
  <div v-if="localValue" class="flex items-center space-x-[6px]">
    <div>{{ localValue.id }}.</div>
      <div class="w-[26px] rounded-full overflow-hidden"><img :src="localValue.avatar" alt="" /></div>
    <div>{{ localValue.name }}</div>
  </div>
</template>
<template #option="{ option }">
  <div class="flex items-center space-x-[6px]">
    <div>{{ option.id }}.</div>
      <div class="w-[26px] rounded-full overflow-hidden"><img :src="option.avatar" alt="" /></div>
    <div>{{ option.name }}</div>
  </div></template>
</RmSelect>
`

const options03 = `<RmSelect label="..." ... >
  <template #expand>
    <div>
      <svg xmlns="..." ... .></svg>
    </div>
  </template>
  <template #checked>
    <div>
      <svg xmlns="..." ... .></svg>
    </div>
  </template>
</RmSelect>`

const floatingInputEx1 = `
<template>
  <div>
    <div class="w-full bg-white" :class="theme.height">
      <div class="relative h-full w-full">
        <input
          ref="rootRef"
          placeholder=" "
          :style="\`padding-right:\${decorationPadding}\`"
          class="absolute block w-full pt-[12px] appearance-none  outline-none"
          :class="[
            inputIcon ? 'pl-[42px]' : '',
            theme.radius,
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.height,
            theme.radius,
            theme.border,
            disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
            !error
              ? \`\${theme.borderColor} focus:border-[#00A3FF] focus:ring-[#00A3FF]\`
              : ' border border-red-500 text-red-900 focus-within:border-red-500 focus-within:ring-red-500',
          ]"
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <label
          :for="id"
          class="absolute inset-y-0 pointer-events-none flex origin-[0%] items-center text-[#737373] duration-200 ease-linear"
          :class="[theme.paddingX, theme.fontSize, inputIcon ? 'pl-[42px]' : '']"
          >
          {{ label }}
          </label>
        <div ref="element" class="absolute inset-y-0 right-[16px] flex items-center space-x-[8px]">
          <div v-if="unit" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">{{ unit }}</div>
          <div class="flex items-center space-x-[8px]">
            <button v-if="showPassword" @click="handleShow" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <div v-if="passwordInputState === 'password'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </div>
            </button>

            <button v-if="clear" @click="handleClear" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled>
            </button>
          </div>
        </div>
        <div v-if="inputIcon" class="absolute top-[15px] left-[16px] flex h-[18px] w-[18px] items-center justify-center">
          <slot name="inputIcon"></slot>
        </div>
      </div>


    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxLength" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
input:focus-within ~ label,
input:not(:placeholder-shown) ~ label {
  @apply transform text-[9px] text-[#9D9D9D] sm:text-[10px] -translate-y-[25%];
}
</style>
`
const floatingInputEx2 = `
<template>
  <div>
    <div class="w-full bg-white" :class="theme.height">
      <div class="relative h-full w-full">
        <input
          ref="rootRef"
          placeholder=" "
          :style="\`padding-right:\${decorationPadding}\`"
          class="absolute block w-full appearance-none outline-none"
          :class="[
            inputIcon ? 'pl-[42px]' : '',
            theme.radius,
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.height,
            theme.radius,
            theme.border,
            disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
            !error
              ? \`\${theme.borderColor} focus:border-[#00A3FF] focus:ring-[#00A3FF]\`
              : 'border border-red-500 text-red-900 focus-within:border-red-500 focus-within:ring-red-500',
          ]"
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="localValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          autocomplete="off"
          :maxlength="maxLength"
        />
        <label
          :for="id"
          class="absolute inset-y-0 pointer-events-none flex origin-[0%] items-center text-[#737373] duration-200 ease-linear"
          :class="[theme.paddingX, theme.fontSize, inputIcon ? 'pl-[42px]' : '']"
          ><span class="px-[4px]" :class="disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`">
          {{ label }}
          </span>
        </label>
        <div ref="element" class="absolute inset-y-0 right-[16px] flex items-center space-x-[8px]">
          <div v-if="unit" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">{{ unit }}</div>
          <div class="flex items-center space-x-[8px]">
            <button v-if="showPassword" @click="handleShow" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <div v-if="passwordInputState === 'password'">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="#737373" stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </div>
            </button>

            <button v-if="clear" @click="handleClear" class="flex items-center text-[14px] leading-[22px] text-[#A1A1AA]">
              <IconCloseCircleFilled class="w-[16px] text-black/30"></IconCloseCircleFilled>
            </button>
          </div>
        </div>
        <div v-if="inputIcon" class="absolute top-[15px] left-[16px] flex h-[18px] w-[18px] items-center justify-center">
          <slot name="inputIcon"></slot>
        </div>
      </div>


    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxLength" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
input:focus-within ~ label,
input:not(:placeholder-shown) ~ label {
  @apply transform text-[9px] text-[#9D9D9D] sm:text-[12px] -translate-y-[50%];
}
</style>`

const floatingTextareaEx1 = `
<template>
  <div>
    <div class="w-full" ref="InputContainer">
      <div
        class="relative w-full focus-within:border-[#00A3FF] pt-[20px]"
        :class="[theme.radius, theme.border, disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`, theme.textarea_height]"
      >
        <textarea
          ref="rootRef"
          placeholder=" "
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event.target.value)"
          :id="id"
          :rows="rows"
          class="border-1 inset-x-0 top-[20px] bottom-0 absolute block w-full appearance-none sm:leading-[25px] focus:outline-none"
          :class="[
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.radius,
            disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
            !error ? \`\border-[#E5E7EB] text-[#374151]\` : 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500',
          ]"
          spellcheck="false"
          :maxlength="maxlength"
        ></textarea>
        <label
          :for="id"
          class="absolute top-[12px] inset-x-0 flex origin-[0%] items-center text-[#737373] transition-all duration-200 ease-linear"
          :class="[theme.fontSize, theme.paddingX]"
          >
          {{ label }}
        </label>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </div>
  </div>
</template>
<style scoped>
.SCROLLHIDE::-webkit-scrollbar {
  display: none;
}

textarea:focus-within ~ label,
textarea:not(:placeholder-shown) ~ label {
  @apply transform text-[10px] leading-[160%] text-[#9D9D9D] sm:text-[12px] -translate-y-[50%];
}
</style>
`

const floatingTextareaEx2 = `
<template>
  <div>
    <div class="w-full" ref="InputContainer">
      <div
        class="relative w-full focus-within:border-[#00A3FF] pt-[10px]"
        :class="[theme.radius, theme.border, disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`, theme.textarea_height]"
      >
        <textarea
          ref="rootRef"
          placeholder=" "
          :disabled="disabled"
          :value="localValue"
          @input="handleInput($event.target.value)"
          :id="id"
          :rows="rows"
          class="border-1 inset-x-0 top-[10px] bottom-0 absolute block w-full appearance-none sm:leading-[25px] focus:outline-none"
          :class="[
            theme.fontSize,
            theme.text.color,
            theme.paddingX,
            theme.radius,
            disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
            !error ? \`border-[#E5E7EB] text-[#374151]\` : 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500',
          ]"
          spellcheck="false"
          :maxlength="maxlength"
        ></textarea>
        <label
          :for="id"
          class="absolute top-[12px] inset-x-0 flex origin-[0%] items-center text-[#737373] transition-all duration-200 ease-linear"
          :class="[theme.fontSize, theme.paddingX]"
        >
          <span class="px-[4px] -translate-x-[4px]" :class="disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`">
            {{ label }}
          </span>
        </label>
      </div>
      <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :maxLength="maxlength" :localValue="localValue">
        <template #helperIcon> <slot name="helperIcon"></slot> </template>
      </HelperText>
    </div>
  </div>
</template>
<style scoped>
.SCROLLHIDE::-webkit-scrollbar {
  display: none;
}

textarea:focus-within ~ label,
textarea:not(:placeholder-shown) ~ label {
  @apply transform text-[10px] leading-[160%] text-[#9D9D9D] sm:text-[12px] -translate-y-[115%];
}
</style>

`

const floatingSelectEx1 = `
<template>
  <div ref="my">
    <div class="relative select-none">
      <div class="relative">
        <div
          ref="rootRef"
          :id="id"
          @click="handleOpen"
          class="relative flex items-center pr-[42px] focus:outline-none focus:ring-1"
          :class="[
            theme.height,
            theme.border,
            theme.radius,
            theme.bgColor,
            theme.paddingX,
            !error ? \`\${theme.borderColor} focus:border-primary-500 focus:ring-primary-500\` : 'border-red-300 focus:border-red-500 focus:ring-red-500',
          ]"
          tabindex="0"
        >
          <div class="text-[#A3A3A3] absolute inset-0 transform transition-all flex items-center duration-300" :class="[theme.paddingX, floatingLabel]">
            {{ label }}
          </div>
          <span
            class="leading-[22px] pt-[12px] absolute pr-[32px] inset-x-0 truncate"
            :class="[theme.fontSize, theme.paddingX, localValue ? theme.text.color : 'text-[#A3A3A3]']"
          >
            <slot name="header" :localValue="localValue">
              {{ optionsLabel(localValue) }}
            </slot>
          </span>

          <div class="absolute inset-y-0 right-[10px] flex items-center justify-center">
            <slot name="expand">
              <IconChevronDown class="w-[18px]"></IconChevronDown>
            </slot>
          </div>
        </div>
        <transition
          enter-active-class="transition duration-100 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="SCROLL inset-x-0 absolute top-[100%] z-10 w-full overflow-hidden overflow-y-auto"
            :class="[theme.select_maxHeight, theme.select_marginTop, theme.select_optionBorder, theme.bgColor, theme.borderColor, theme.radius]"
          >
            <div
              v-for="option in options"
              @click="handleSelect(option)"
              class="flex relative cursor-default items-center justify-between leading-[22px] pr-[32px]"
              :class="[
                theme.paddingX,
                theme.select_paddingY,
                theme.select_optionFontSize,
                theme.select_optionHover,

                optionsLabel(localValue) === optionsLabel(option) ? theme.select_optionSelected : '',
              ]"
            >
              <slot name="option" :option="option">
                <span class="truncate">
                  {{ optionsLabel(option) }}
                </span>
              </slot>
              <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="flex right-[10px] absolute items-center justify-center">
                <slot name="checked">
                  <iconCheck class="w-[18px]"></iconCheck>
                </slot>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
.floating:focus-within ~ label,
.floating:not(:placeholder-shown) ~ label {
  @apply transform text-[9px] text-[#9D9D9D] sm:text-[10px] -translate-y-[25%];
}

.SCROLL::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

.SCROLL::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #d9d9d9;
}
</style>
`
const floatingSelectEx2 = `
<template>
  <div ref="my">
    <div class="relative select-none">
      <div class="relative">
        <div
          ref="rootRef"
          :id="id"
          @click="handleOpen"
          class="relative flex items-center pr-[42px] focus:outline-none focus:ring-1"
          :class="[
            theme.height,
            theme.border,
            theme.radius,
            theme.bgColor,
            theme.paddingX,
            !error ? \`\${theme.borderColor} focus:border-primary-500 focus:ring-primary-500\` : 'border-red-300 focus:border-red-500 focus:ring-red-500',
          ]"
          tabindex="0"
        >
          <div class="text-[#A3A3A3] absolute inset-0 transform transition-all flex items-center duration-300" :class="[theme.paddingX, floatingLabel]">
            <span class="px-[4px] -translate-x-[4px]" :class="disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`">
              {{ label }}
            </span>
          </div>
          <span
            class="leading-[22px] absolute pr-[32px] inset-x-0 truncate"
            :class="[theme.fontSize, theme.paddingX, localValue ? theme.text.color : 'text-[#A3A3A3]']"
          >
            <slot name="header" :localValue="localValue">
              {{ optionsLabel(localValue) }}
            </slot>
          </span>

          <div class="absolute inset-y-0 right-[10px] flex items-center justify-center">
            <slot name="expand">
              <IconChevronDown class="w-[18px]"></IconChevronDown>
            </slot>
          </div>
        </div>
        <transition
          enter-active-class="transition duration-100 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            class="SCROLL inset-x-0 absolute top-[100%] z-10 w-full overflow-hidden overflow-y-auto"
            :class="[theme.select_maxHeight, theme.select_marginTop, theme.select_optionBorder, theme.bgColor, theme.borderColor, theme.radius]"
          >
            <div
              v-for="option in options"
              @click="handleSelect(option)"
              class="flex relative cursor-default items-center justify-between leading-[22px] pr-[32px]"
              :class="[
                theme.paddingX,
                theme.select_paddingY,
                theme.select_optionFontSize,
                theme.select_optionHover,
                optionsLabel(localValue) === optionsLabel(option) ? theme.select_optionSelected : '',
              ]"
            >
              <slot name="option" :option="option">
                <span class="truncate">
                  {{ optionsLabel(option) }}
                </span>
              </slot>
              <span v-if="optionsLabel(localValue) === optionsLabel(option)" class="flex right-[10px] absolute items-center justify-center">
                <slot name="checked">
                  <iconCheck class="w-[18px]"></iconCheck>
                </slot>
              </span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>

<style scoped>
.floating:focus-within ~ label,
.floating:not(:placeholder-shown) ~ label {
  @apply transform text-[9px] text-[#9D9D9D] sm:text-[10px] -translate-y-[25%];
}

.SCROLL::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

.SCROLL::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #d9d9d9;
}
</style>
`

const dividedInputEx = `<RmDividedInput label="label" v-model="Value" :horizontal="true" :labelWidth="70"> </RmDividedInput>`

const checkbox = {
  simple: `
  <RmCheckbox id="checkbox-1" v-model="items.value">동의합니다.</RmCheckbox>

  <RmCheckbox id="checkbox-2" v-model="items.optionValue" :options="['동의하지 않습니다', '동의합니다']">{{ items.optionValue }}</RmCheckbox>
  `,
  multi: `
  <RmMultiCheckbox id="checkbox-3" v-model="items.optionsValue1" :options="['사과', '바나나']"></RmMultiCheckbox>

  <RmMultiCheckbox
  id="checkbox-4"
  v-model="items.optionsValue2"
  :options="[
    { label: '사과', value: 'apple' },
    { label: '바나나', value: 'banana' },
  ]"
  :optionsValue="(option) => option.value"
  :optionsLabel="(option) => option.label"
></RmMultiCheckbox>
  `,
}

const radio = {
  usage: `
 <RmRadio id="radio-1" :options="simpleOptions" v-model="items.simple"></RmRadio>

 <RmRadio
  id="radio-2"
  :options="optionsWithValue"
  :optionsValue="(option) => option.value"
  :optionsLabel="(option) => option.label"
  v-model="items.values"
></RmRadio>`,
  RmInputRadio: `
<script setup>
import { toRefs, computed } from 'vue'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'
import useError from '@/composables/useError'
import useInput from '@/composables/useInput'
import useTheme from '@/composables/useTheme'

const props = defineProps({
  id: { type: String },
  label: { type: String },
  modelValue: { type: [String, Number] },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  format: { type: Function, default: (o) => o },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  options: { type: Array },
  optionsLabel: { type: Function, default: (option) => option },
  optionsValue: { type: Function, default: (option) => option },
  styles: { type: Object },
})
const emit = defineEmits(['update:modelValue'])
const theme = useTheme(computed(() => props.styles))

const { id, modelValue, format } = toRefs(props)
const { rootRef, error } = useError(id)
const { localValue, handleInput } = useInput(id, modelValue, format, emit)
</script>

<template>
  <div class="w-full space-y-[4px]">
    <RmLabel
      :label="label"
      :labelFontSize="theme.label_fontSize"
      :labelFontColor="theme.label_fontColor"
      :labelHelper="labelHelper"
      :required="required"
      :id="id"
    ></RmLabel>
    <div class="relative">
      <div
        ref="rootRef"
        class="flex w-full items-center justify-center space-x-[16px]"
        :class="[
          theme.fontSize,
          theme.text.color,
          theme.paddingX,
          theme.height,
          theme.radius,
          theme.border,
          disabled ? 'bg-[#eeeeee]' : \`\${theme.bgColor}\`,
          !error ? \`\${theme.borderColor} focus:border-[#00A3FF] focus:ring-[#00A3FF]\` : 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500',
        ]"
      >
        <label v-for="(option, index) in options" :for="\`\${id}_\${index}_\${optionsValue(option)}\`">
          <input
            :id="\`\${id}_\${index}_\${optionsValue(option)}\`"
            :name="id"
            :disabled="disabled"
            type="radio"
            class="hidden"
            @input="handleInput"
            :value="optionsValue(option)"
            :key="optionsValue(option)"
            v-model="localValue"
          />

          <div class="flex items-center space-x-[8px]">
            <span
              v-if="localValue === optionsValue(option)"
              class="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1px] border-black bg-white"
              ><span class="h-[10px] w-[10px] rounded-full bg-black"></span
            ></span>
            <span v-else class="h-[18px] w-[18px] rounded-full border border-[#D4D4D4] bg-white"></span>
            <span> {{ optionsLabel(option) }} </span>
          </div>
        </label>
      </div>
    </div>

    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon" :localValue="localValue">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>`,
}

const toggle = {
  RmToggleWithLeftDeco: `
<script setup>
import { IconQuestionMark } from '@/components/icon'
import RmToggle from './RmToggle.vue'

const props = defineProps({
  id: { type: String },
  modelValue: { type: [String, Number, Boolean] },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  label: { type: String, required: true },
  description: { type: String },
  question: { type: Boolean, default: false },
  hover: { type: String },
})
</script>

<template>
  <div>
    <div class="flex w-full items-center justify-between rounded-[12px] border border-[#E5E5E5] bg-[#F9FAFB] px-[16px] pt-[22px] pb-[16px]">
      <div class="space-y-[6px] self-start">
        <div class="flex items-center space-x-[4px]">
          <div class="text-[18px] font-bold leading-[18px] text-[#374151]">{{ label }}</div>
          <div v-if="question" class="group relative">
            <IconQuestionMark class="w-[16px] text-[#6B7280]"></IconQuestionMark>
            <div class="absolute -left-[6px] bottom-[calc(100%+8px)] hidden group-hover:block">
              <div class="whitespace-nowrap rounded-[8px] bg-[#262626] py-[8px] px-[10px] text-[12px] leading-[15px] text-white" v-html="hover"></div>
              <div class="absolute -bottom-[3px] left-[10px] h-[8px] w-[8px] rotate-45 bg-[#262626]"></div>
            </div>
          </div>
        </div>
        <div class="mt-[6px] flex-1 text-[14px] leading-[22px] text-[#6B7280]" v-if="description">{{ description }}</div>
      </div>

      <RmToggle :id="id" :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :options="options" :disabled="disabled"></RmToggle>
    </div>

  </div>
</template>
`,
  RmToggleWithLeftLabel: `
<script setup>
import { computed } from 'vue'
import useError from '@/composables/useError'
import RmToggle from './RmToggle.vue'
import HelperText from '@/components/form/components/HelperText.vue'
import RmLabel from '@/components/element/label/RmLabel.vue'
import useTheme from '@/composables/useTheme'

const props = defineProps({
  id: { type: String },
  labelHelper: { type: String },
  helperText: { type: String },
  helperIcon: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  label: { type: String, required: true },
  description: { type: String },
  icon: { type: Boolean, default: false },
})

const theme = useTheme(computed(() => props.styles))
const { error } = useError(props.id)
</script>

<template>
  <div>
    <RmLabel
      :label="label"
      :labelFontSize="theme.label_fontSize"
      :labelFontColor="theme.label_fontColor"
      :labelHelper="labelHelper"
      :required="required"
      :id="id"
    ></RmLabel>
    <div
      class="flex w-full items-center justify-between"
      :class="[
        theme.fontSize,
        theme.paddingX,
        theme.height,
        theme.radius,
        theme.border,
        !error ? \` \${theme.borderColor} focus:border-[#00A3FF] focus:ring-[#00A3FF]\` : 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500',
      ]"
    >
      <div class="flex-1 leading-[22px] text-[#a3a3a3]" v-if="description">{{ description }}</div>
      <RmToggle
        :isSmall="true"
        :id="id"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :options="options"
        :disabled="disabled"
      ></RmToggle>
    </div>
    <HelperText :id="id" :error="error" :helperText="helperText" :helperIcon="helperIcon">
      <template #helperIcon> <slot name="helperIcon"></slot> </template>
    </HelperText>
  </div>
</template>
`,
  RmToggleWithRightLabel: `
<script setup>
import { ref, watchEffect } from 'vue'
import RmToggle from './RmToggle.vue'

const props = defineProps({
  label: { type: String },
  description: { type: String },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean] },
  options: { type: Array, default: () => [false, true], validator: (values) => values.length >= 2 },
  id: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const localValue = ref(null)

watchEffect(() => {
  localValue.value = props.modelValue
})
const handleClick = () => {
  localValue.value = !localValue.value
  emit('update:modelValue', localValue.value)
  console.log('123')
}
</script>

<template>
  <div class="inline-flex cursor-pointer items-center" @click="handleClick">
    <RmToggle :id="id" :modelValue="modelValue" @update.stop:modelValue="$emit('update:modelValue', $event)" :options="options" :disabled="disabled"></RmToggle>
    <div class="flex items-center space-x-[4px] pl-[12px]">
      <span class="text-[14px]">{{ label }}</span>
      <span class="text-[12px] text-gray-500">{{ description }}</span>
    </div>
  </div>
</template>
`,
}

export default {
  InputExample,
  textarea,
  people,
  selectDesign,
  options01,
  options02,
  options03,
  floatingTextareaEx1,
  floatingTextareaEx2,
  floatingInputEx1,
  floatingInputEx2,
  floatingSelectEx1,
  floatingSelectEx2,
  dividedInputEx,
  checkbox,
  radio,
  toggle,
}

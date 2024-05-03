import { computed } from 'vue'

export default ({ limit, total, currentPage }, emit) => {
  const range = computed(() => {
    return pagination(currentPage.value, Math.ceil(total.value / limit.value))
  })

  const isNext = computed(() => {
    return currentPage.value * limit.value < total.value
  })

  const isPrev = computed(() => {
    return currentPage.value > 1
  })

  const click = (page) => {
    if (!Number.isInteger(page)) return
    if (currentPage.value === page) return
    changePage(page)
  }

  const clickPrev = () => {
    if (!isPrev.value) return
    changePage(currentPage.value - 1)
  }

  const clickFirst = () => {
    if (!isPrev.value) return
    changePage(1)
  }

  const clickNext = () => {
    if (!isNext.value) return
    changePage(currentPage.value + 1)
  }

  const clickLast = () => {
    if (!isNext.value) return
    changePage(range.value[range.value.length - 1])
  }

  const changePage = (page) => {
    emit('onChangePage', page)
  }

  return {
    range,
    isNext,
    isPrev,
    click,
    clickPrev,
    clickNext,
    clickFirst,
    clickLast,
  }
}

function pagination(c, m) {
  var current = c
  var last = m
  var delta = 2
  var left = current - delta
  var right = current + delta + 1
  var range = []
  var rangeWithDots = []
  var l

  if (left < 1) {
    left = 1
    right = left + delta * 2 + 1
  }
  if (c > m - delta) {
    left = m - delta * 2
    right = m
  }

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l !== 1) {
        rangeWithDots.push('...')
      }
      // else if (i - l === 2) {
      //   rangeWithDots.push(l + 1)
      // }
    }
    rangeWithDots.push(i)
    l = i
  }
  // console.log(rangeWithDots, '레인지')
  return rangeWithDots
}

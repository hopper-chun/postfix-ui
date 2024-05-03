import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// watch로 query의 변경을 감지하여 reload하는 경우 다른 페이지로 나가는것도 변경으로 감지하여 쓸데없이 reload하는 경우가 있다
// 그래서 기존의 route.path를 기록했다가 watch로 감지했을때 같은 path면 query만 변경된걸로 간주하여 reload를 한다.
// 근데 같은 컴포넌트를 create와 edit로 사용하는 경우,
// 전체 path가 변경되었는데(edit --> create) 이것을 정상적으로 다른곳으로 이동한것으로 간주하고 reload를 씹어버린다.
// 그래서 create와 edit가 같은 컴포넌트인 경우 route에 meta 항목으로 name을 동일한 이름으로 입력하고
// 변경시 이름이 같으면 reload를 수행하도록 한다.
// 결론. 동일한 컴포넌트를 2개 이상에서 사용하는 경우 반드시 동일한 이름을 meta에 넣어주어야 한다.

// 2022.08.10 근데 edit에서 create로 바로 이동하는 경우는 잘 없고, list를 거처서 가는 경우에는 meta 안써도 될꺼 같은데...

export default (cb) => {
  let currentPath = ''
  let currentName = ''

  const route = useRoute()

  onMounted(() => {
    currentPath = route.path
    currentName = route.meta.name || ''
    // console.log('onMounted: currentPath', currentPath, currentName)
  })

  // 쿼리를 추가 했을때 자동으로 reload하게 한다.
  // 그런데 현재 페이지를 벗어나 다른곳으로 이동하는 경우에는 reload되지 않게 한다.
  watch(
    () => route.fullPath,
    () => {
      // const isEmpty = Object.keys(route.query).length === 0
      // if (!isEmpty) {
      // console.log('watch: route.path', route.path, currentPath)
      if (currentPath === route.path) {
        console.log('currentPath === route.path', currentPath)
        return cb()
      }
      // console.log('watch: route.meta.name', route.meta.name, currentName)
      if (currentName && currentName === route.meta.name) {
        console.log('currentName === route.meta.name', currentName)
        cb()
      }
      // }
    }
  )
}

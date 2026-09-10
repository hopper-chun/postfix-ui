import Search from "./Search.vue";

export default [
  {
    name: "search",
    path: "/search",
    component: Search,
    meta: {
      title: "검색",
      description: "Postfix UI 문서 검색 결과",
      searchable: false,
    },
  },
];

import Listbox from './Listbox.vue'
import Table from './Table.vue'
import AdminTable from './AdminTable.vue'
import AdminTableGrid from './AdminTableGrid.vue'
import Pagination from './Pagination.vue'
import Tab from './Tab.vue'

export default [
  { name: 'Listbox', path: '/listbox', component: Listbox },
  { name: 'Table', path: '/table', component: Table },
  { name: 'AdminTable', path: '/adminTable', component: AdminTable },
  { name: 'AdminTableGrid', path: '/adminTableGrid', component: AdminTableGrid },
  { name: 'Pagination', path: '/pagination', component: Pagination },
  { name: 'Tab', path: '/tab', component: Tab },
]

export default (row) => {
  // arg.key가 aa.bb 와 같은 형태로 들어오면, 알아서 row.value[aa][bb]처럼 구성되도록?
  const onUpdateRow = function (arg) {
    if (arg.key.includes('.')) {
      let splited = arg.key.split('.')

      if (splited.length === 2) {
        row.value[splited[0]][splited[1]] = arg.value
      } else if (splited.length === 3) {
        row.value[splited[0]][splited[1]][splited[2]] = arg.value
      } else if (splited.length === 4) {
        row.value[splited[0]][splited[1]][splited[2]][splited[3]] = arg.value
      } else {
        row.value[arg.key] = arg.value
      }
    } else {
      row.value[arg.key] = arg.value
    }
  }

  return { onUpdateRow }
}

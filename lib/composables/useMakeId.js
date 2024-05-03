export default (prefix) => {
  return (prefix || 'RM_') + Math.floor(Math.random() * 1000000000)
}

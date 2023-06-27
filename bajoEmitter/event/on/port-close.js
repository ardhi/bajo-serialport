async function onPortClose (conn, ...args) {
  const { log } = this.bajo.helper
  log.info(`'%s' (%s) is close`, conn.name, conn.path)
}

export default {
  handler: onPortClose,
  level: 1000
}

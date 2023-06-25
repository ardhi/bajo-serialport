async function onPortOpen (conn, ...args) {
  const { log } = this.bajo.helper
  log.info(`Port '%s' (%s) is open`, conn.name, conn.path)
}

export default {
  handler: onPortOpen,
  level: 1
}

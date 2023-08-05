async function onPortClose (conn, ...args) {
  const { log } = this.bajo.helper
  log.info('\'%s@%s\' is closed', conn.path, conn.name)
}

const portClose = {
  handler: onPortClose,
  level: 1000
}

export default portClose

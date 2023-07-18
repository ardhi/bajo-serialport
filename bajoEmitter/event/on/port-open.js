async function onPortOpen (conn, ...args) {
  const { log } = this.bajo.helper
  log.info('Port \'%s\' (%s) is open', conn.name, conn.path)
}

const portOpen = {
  handler: onPortOpen,
  level: 1
}

export default portOpen

async function onPortOpen (conn, ...args) {
  const { log } = this.bajo.helper
  log.info('Port \'%s@%s\' is open', conn.path, conn.name)
}

const portOpen = {
  handler: onPortOpen,
  level: 1
}

export default portOpen

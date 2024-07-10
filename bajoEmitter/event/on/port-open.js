async function onPortOpen (conn, ...args) {
  this.log.debug('Port \'%s (%s)\' is open', conn.name, conn.path)
}

const portOpen = {
  handler: onPortOpen,
  level: 1
}

export default portOpen

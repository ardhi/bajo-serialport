async function onPortOpen (conn, ...args) {
  this.log.debug('Connection \'%s\' is open', conn.name)
}

const portOpen = {
  handler: onPortOpen,
  level: 1
}

export default portOpen

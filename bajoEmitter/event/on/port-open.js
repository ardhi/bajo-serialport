async function onPortOpen (conn, ...args) {
  this.log.debug('Connection \'%s\' is %s', conn.name, this.print.write('open'))
}

const portOpen = {
  handler: onPortOpen,
  level: 1
}

export default portOpen

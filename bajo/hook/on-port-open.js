async function handler (conn, ...args) {
  this.log.debug('connIs%s%s', conn.name, this.print.write('openedL'))
}

const portOpen = {
  handler,
  level: 1
}

export default portOpen

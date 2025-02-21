async function handler (conn, ...args) {
  this.log.trace('connIs%s%s', conn.name, this.print.write('closedL'))
}

const portClose = {
  handler,
  level: 1000
}

export default portClose

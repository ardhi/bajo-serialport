const portClose = {
  handler: async function onPortClose (conn, ...args) {
    this.log.trace('Connection \'%s\' is %s', conn.name, this.print.write('closed'))
  },
  level: 1000
}

export default portClose

const portClose = {
  handler: async function onPortClose (conn, ...args) {
    this.log.trace('Connection \'%s\' is closed', conn.name)
  },
  level: 1000
}

export default portClose

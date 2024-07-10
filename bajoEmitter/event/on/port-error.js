const portError = {
  handler: async function onPortError (conn, err, ...args) {
    this.log.error('Connection \'%s\' error: %s', conn.name, err.message)
  },
  level: 1
}

export default portError

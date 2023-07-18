async function onPortError (conn, err, ...args) {
  const { log } = this.bajo.helper
  log.error('\'%s\' error: %s', conn.name, err.message)
}

const portError = {
  handler: onPortError,
  level: 1
}

export default portError

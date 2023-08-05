async function onPortError (conn, err, ...args) {
  const { log } = this.bajo.helper
  log.error('\'%s@%s\' error: %s', conn.path, conn.name, err.message)
}

const portError = {
  handler: onPortError,
  level: 1
}

export default portError

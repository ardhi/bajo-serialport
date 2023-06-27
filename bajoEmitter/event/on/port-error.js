async function onPortError (conn, err, ...args) {
  const { log } = this.bajo.helper
  log.error(`'%s' error: %s`, conn.name, err.message)
}

export default {
  handler: onPortError,
  level: 1
}

async function handler (conn, err, ...args) {
  this.log.error('connError%s%s', conn.name, err.message)
}

const portError = {
  handler,
  level: 1
}

export default portError

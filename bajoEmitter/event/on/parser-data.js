async function onParserData (conn, msg, ...args) {
  // for broadcast only
  const { broadcast } = this.bajoEmitter.helper
  for (const b of conn.options.broadcastPool || []) {
    broadcast({
      msg,
      to: b,
      from: `${conn.path}@${conn.name}.bajoSerialport`
    })
  }
}

const parserData = {
  handler: onParserData,
  level: 1
}

export default parserData

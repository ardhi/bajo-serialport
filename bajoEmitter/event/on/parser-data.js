const parserData = {
  handler: async function onParserData (conn, msg, ...args) {
    const { broadcast } = this.app.bajoEmitter.helper
    if (!conn.broadcast) return
    broadcast({ from: `${conn.name}@bajoSerialport`, msg })
  },
  level: 1
}

export default parserData

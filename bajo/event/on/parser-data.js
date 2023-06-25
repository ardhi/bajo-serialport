async function onParserData (conn, data, ...args) {
  const { getConfig, emit } = this.bajo.helper
  const opts = getConfig('bajoSerialport')
  for (const b of opts.broadcasts) {
    if (b.connection === conn.name) emit(b.event, `bajoSerialport:${conn.name}`, data)
  }
}

export default {
  handler: onParserData,
  level: 1
}

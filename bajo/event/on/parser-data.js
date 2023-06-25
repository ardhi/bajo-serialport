async function onParserData (conn, message, ...args) {
  const { getConfig, emit, _, log } = this.bajo.helper
  const opts = getConfig('bajoSerialport')
  for (const b of opts.broadcasts) {
    if (b.connection !== conn.name) continue
    const c = _.find(opts.connections, { name: b.connection })
    const sentences = _.get(c, 'options.decodeNmea', [])
    if (_.isEmpty(sentences)) emit(b.event, `bajoSerialport:${conn.name}`, message)
    if (!this.bajoCodec) return
    try {
      const decoded = await this.bajoCodec.helper.decodeNmea({ message, sentences })
      if (decoded) emit(b.event, `bajoSerialport:${conn.name}`, decoded)
    } catch (err) {
      log.error(`'%s' error: %s`, c.connection, err.message)
    }
  }
}

export default {
  handler: onParserData,
  level: 1
}

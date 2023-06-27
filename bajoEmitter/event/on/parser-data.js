async function onParserData (conn, message, ...args) {
  const { getConfig, _, log } = this.bajo.helper
  const { broadcast } = this.bajoEmitter.helper
  const cfg = getConfig('bajoSp')
  for (const b of cfg.broadcasts) {
    if (b.connection !== conn.name) continue
    const c = _.find(cfg.connections, { name: b.connection })
    const meta = {
      sender: `${conn.path}@bajoSp.${conn.name}`,
      receiver: b.receiver
    }
    const sentences = _.get(c, 'options.decodeNmea', [])
    if (_.isEmpty(sentences)) broadcast(message, meta)
    if (!this.bajoCodec) return
    try {
      const transformer = b.transformer
      const decoded = await this.bajoCodec.helper.decodeNmea({ message, sentences, transformer })
      if (decoded) broadcast(decoded, meta)
    } catch (err) {
      log.error(`'%s' error: %s`, c.connection, err.message)
    }
  }
}

export default {
  handler: onParserData,
  level: 1
}

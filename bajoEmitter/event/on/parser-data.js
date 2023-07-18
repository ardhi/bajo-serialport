async function onParserData (conn, message, ...args) {
  const { getConfig, log, importPkg } = this.bajo.helper
  const { broadcast } = this.bajoEmitter.helper
  const { find, get, isEmpty } = await importPkg('lodash-es')
  const cfg = getConfig('bajoSerialport')
  for (const b of cfg.broadcasts) {
    if (b.connection !== conn.name) continue
    const c = find(cfg.connections, { name: b.connection })
    const meta = {
      sender: `${conn.path}@bajoSerialport.${conn.name}`,
      receiver: b.receiver
    }
    const sentences = get(c, 'options.decodeNmea', [])
    if (isEmpty(sentences)) broadcast(message, meta)
    if (!this.bajoCodec) return
    try {
      const transformer = b.transformer
      const decoded = await this.bajoCodec.helper.decodeNmea({ message, sentences, transformer })
      if (decoded) broadcast(decoded, meta)
    } catch (err) {
      log.error('\'%s\' error: %s', c.connection, err.message)
    }
  }
}

const parserData = {
  handler: onParserData,
  level: 1
}

export default parserData

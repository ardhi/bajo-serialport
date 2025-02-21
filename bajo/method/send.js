async function send ({ msg, to } = {}) {
  const { find } = this.app.bajo.lib._
  const { addressSplit } = this.app.bajoEmitter
  const { connection, plugin } = addressSplit(to)
  if (plugin !== this.name) return
  const c = find(this.connections, { name: connection })
  if (!c) throw this.error('unknownConn%s', connection)
  c.instance.write(msg)
}

export default send

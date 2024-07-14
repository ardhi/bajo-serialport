async function send ({ msg, to } = {}) {
  const { error } = this.app.bajo
  const { find } = this.app.bajo.lib._
  const { addressSplit } = this.app.bajoEmitter
  const { connection, plugin } = addressSplit(to)
  if (plugin !== this.name) return
  const c = find(this.connections, { name: connection })
  if (!c) throw error('Unknown connection \'%s\'', connection)
  c.instance.write(msg)
}

export default send

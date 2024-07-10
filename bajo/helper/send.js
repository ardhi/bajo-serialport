async function send ({ msg, to } = {}) {
  const { error } = this.app.bajo.helper
  const { find } = this.app.bajo.helper._
  const { addressSplit } = this.app.bajoEmitter.helper
  const { connection, plugin } = addressSplit(to)
  if (plugin !== this.name) return
  const c = find(this.connections, { name: connection })
  if (!c) throw error('No such connection \'%s\'', connection)
  c.instance.write(msg)
}

export default send

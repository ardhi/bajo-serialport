function getClient (name) {
  const { getConfig, error } = this.bajo.helper
  const { find } = this.bajo.helper._
  const opts = getConfig('bajoSerialport')
  let conn = find(opts.connections, { name })
  if (!conn) conn = find(opts.connections, { path: name })
  if (!conn) throw error('Unknown port with name/path \'%s\'', name)
  return find(this.bajoSerialports.instances, { name: conn.name })
}

export default getClient

function getClient (name) {
  const { _, getConfig, error } = this.bajo.helper
  const opts = getConfig('bajoSerialport')
  let conn = _.find(opts.connections, { name })
  if (!conn) conn = _.find(opts.connections, { path: name })
  if (!conn) throw error(`Unknown port with name/path '%s'`, name, { code: 'BAJOSP_UNKNOWN_PORT' })
  return _.find(this.bajoSerialports.instances, { name: conn.name })
}

export default getClient

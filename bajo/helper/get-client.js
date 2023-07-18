async function getClient (name) {
  const { getConfig, error, importPkg } = this.bajo.helper
  const { find } = await importPkg('lodash-es')
  const opts = getConfig('bajoSerialport')
  let conn = find(opts.connections, { name })
  if (!conn) conn = find(opts.connections, { path: name })
  if (!conn) throw error('Unknown port with name/path \'%s\'', name, { code: 'BAJOSP_UNKNOWN_PORT' })
  return find(this.bajoSerialports.instances, { name: conn.name })
}

export default getClient

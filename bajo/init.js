async function connBuilder (c) {
  const { _, error } = this.bajo.helper
  if (_.isString(c)) c = { url: c }
  if (!_.has(c, 'path')) throw error('Connection must have path', { code: 'BAJOSERIALPORT_CONNECTION_PATH_MISSING' })
  if (!_.has(c, 'name')) c.name = c.path
}

function prepBroadcasts () {
  const { _, getConfig, error } = this.bajo.helper
  const opts = getConfig('bajoSerialport')
  let bcs = opts.broadcasts || []
  if (_.isPlainObject(bcs)) bcs = [bcs]
  for (const b of bcs) {
    if (!b.connection) throw error('A broadcaster must be bound to a connection', { code: 'BAJOSERIALPORT_BROADCASTER_CONNECTION_MISSING' })
    if (!_.map(opts.connections, 'name').includes(b.connection)) throw error(`Unknown connection`, { code: 'BAJOSERIALPORT_BROADCASTER_CONNECTION_UNKNOWN' })
    if (!b.event) throw error('A broadcaster must be bound to event name to send to', { code: 'BAJOSERIALPORT_BROADCASTER_EVENT_MISSING' })
    const [ns, path] = b.event.split(':')
    const evt = _.find(this.bajo.events, { ns, path })
    if (!evt) throw error(`Unknown event '${b.event}'`, { code: 'BAJOSERIALPORT_BROADCASTER_EVENT_UNKNOWN' })
  }
}

async function init () {
  const { _, buildConnections } = this.bajo.helper
  prepBroadcasts.call(this)
  await buildConnections('bajoSerialport', connBuilder, ['name', 'path'])
}

export default init

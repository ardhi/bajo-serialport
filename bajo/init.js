const parsers = ['ByteLengthParser', 'CCTalkParser', 'DelimiterParser', 'InterByteTimeoutParser',
  'PacketLengthParser', 'ReadlineParser', 'ReadyParser', 'RegexParser', 'SlipEncoder', 'SlipDecoder',
  'SpacePacketParser']

async function connBuilder (c) {
  const { importPackage, error } = this.bajo.helper
  const _ = await importPackage('lodash')
  if (_.isString(c)) c = { url: c }
  if (!_.has(c, 'path')) throw error('Connection must have path', { code: 'BAJOSP_CONNECTION_PATH_MISSING', connection: c })
  if (!_.has(c, 'name')) c.name = c.path
  c.options = c.options || {}
  c.options.parser = c.options.parser || { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!parsers.includes(c.options.parser.name)) throw error('Unknown parser', { code: 'BAJOSP_PARSER_UNKNOWN', connection: c })
  if (c.options.decodeNmea && !this.bajoCodec) throw error(`To be able to decode NMEA, you need to load bajoCodec first`, { code: 'BAJOSP_BAJOCODEC_MISSING' })
}

async function prepBroadcasts () {
  const { importPackage, getConfig, error, getItemByName } = this.bajo.helper
  const _ = await importPackage('lodash')
  const opts = getConfig('bajoSp')
  let bcs = opts.broadcasts || []
  if (_.isPlainObject(bcs)) bcs = [bcs]
  for (const b of bcs) {
    if (!b.connection) throw error('A broadcast must be bound to a connection', { code: 'BAJOSP_BROADCAST_CONNECTION_MISSING' })
    if (!_.map(opts.connections, 'name').includes(b.connection)) throw error(`Unknown connection`, { code: 'BAJOSP_BROADCAST_CONNECTION_UNKNOWN' })
    if (!b.receiver) throw error('A broadcast must have destination', { code: 'BAJOSP_BROADCAST_DESTINATION_MISSING' })
    if (!_.isArray(b.receiver)) b.receiver = [b.receiver]
    if (_.isFunction(b.transformer)) b.transformer = await b.transformer.call(this)
    else if (_.isString(b.transformer)) b.transformer = await getItemByName(b.transformer)
  }
}

async function init () {
  const { buildConnections } = this.bajo.helper
  await prepBroadcasts.call(this)
  await buildConnections('bajoSp', connBuilder, ['name', 'path'])
}

export default init

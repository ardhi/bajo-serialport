const parsers = ['ByteLengthParser', 'CCTalkParser', 'DelimiterParser', 'InterByteTimeoutParser',
  'PacketLengthParser', 'ReadlineParser', 'ReadyParser', 'RegexParser', 'SlipEncoder', 'SlipDecoder',
  'SpacePacketParser']

async function connBuilder (c) {
  const { importPkg, error } = this.bajo.helper
  const { isString, has } = await importPkg('lodash-es')
  if (isString(c)) c = { url: c }
  if (!has(c, 'path')) throw error('Connection must have a path', { code: 'BAJOSP_CONNECTION_PATH_MISSING', connection: c })
  if (!has(c, 'name')) c.name = c.path
  c.options = c.options || {}
  c.options.parser = c.options.parser || { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!parsers.includes(c.options.parser.name)) throw error('Unknown parser \'%s\'', c.options.parser.name, { code: 'BAJOSP_PARSER_UNKNOWN', connection: c })
  if (c.options.decodeNmea && !this.bajoCodec) throw error('To be able to decode NMEA, you need to load \'bajo-codec\' first', { code: 'BAJOSP_BAJOCODEC_MISSING' })
}

async function prepBroadcasts () {
  const { importPkg, getConfig, error, getItemByName } = this.bajo.helper
  const { isPlainObject, map, isArray, isFunction, isString } = await importPkg('lodash-es')
  const opts = getConfig('bajoSerialport')
  let bcs = opts.broadcasts || []
  if (isPlainObject(bcs)) bcs = [bcs]
  for (const b of bcs) {
    if (!b.connection) throw error('A broadcast must be bound to a connection', { code: 'BAJOSP_BROADCAST_CONNECTION_MISSING' })
    if (!map(opts.connections, 'name').includes(b.connection)) throw error('Unknown connection \'%s\'', b.connection, { code: 'BAJOSP_BROADCAST_CONNECTION_UNKNOWN' })
    if (!b.receiver) throw error('A broadcast must have destination', { code: 'BAJOSP_BROADCAST_DESTINATION_MISSING' })
    if (!isArray(b.receiver)) b.receiver = [b.receiver]
    if (isFunction(b.transformer)) b.transformer = await b.transformer.call(this)
    else if (isString(b.transformer)) b.transformer = await getItemByName(b.transformer)
  }
}

async function init () {
  const { buildConnections } = this.bajo.helper
  await prepBroadcasts.call(this)
  await buildConnections('bajoSerialport', connBuilder, ['name', 'path'])
}

export default init

const parsers = ['ByteLengthParser', 'CCTalkParser', 'DelimiterParser', 'InterByteTimeoutParser',
  'PacketLengthParser', 'ReadlineParser', 'ReadyParser', 'RegexParser', 'SlipEncoder', 'SlipDecoder',
  'SpacePacketParser']

async function handler ({ item }) {
  const { importPkg, error } = this.bajo.helper
  const { isString, has, isArray, map } = await importPkg('lodash-es')
  if (isString(item)) item = { url: item }
  if (!has(item, 'path')) throw error('Connection must have a path')
  if (!has(item, 'name')) item.name = item.path
  item.options = item.options || {}
  item.options.parser = item.options.parser || { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!parsers.includes(item.options.parser.name)) throw error('Unknown parser \'%s\'', item.options.parser.name)
  if (item.options.decodeNmea && !this.bajoCodec) throw error('To be able to decode NMEA, you need to load \'bajo-codec\' first')
  if (!has(item.options, 'broadcastPool')) item.options.broadcastPool = []
  if (!isArray(item.options.broadcastPool)) item.options.broadcastPool = [item.options.broadcastPool]
  item.options.broadcastPool = map(item.options.broadcastPool, b => {
    if (isString(b)) return { name: b }
    return b
  })
}

async function init () {
  const { buildCollections } = this.bajo.helper
  this.bajoSerialport.connections = await buildCollections({ handler, dupChecks: ['name', 'path'] })
}

export default init

async function handler ({ item }) {
  const { error } = this.app.bajo.helper
  const { isString, has } = this.app.bajo.helper._
  const { parsers } = this.helper
  if (isString(item)) item = { path: item }
  if (!has(item, 'path')) throw error('Connection must have a path')
  item.options = item.options ?? {}
  item.options.parser = item.options.parser ?? { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!parsers.includes(item.options.parser.name)) throw error('Unknown parser \'%s\'', item.options.parser.name)
  if (item.options.decodeNmea) {
    if (item.options.decodeNmea === true) item.options.decodeNmea = { decoder: 'bajoCodec:nmeaDecode' }
    if (item.options.decodeNmea.decoder === 'bajoCodec:nmeaDecode' && !this.app.bajoCodec) item.options.decodeNmea = false
  }
  item.broadcast = item.broadcast ?? false
}

async function init () {
  const { buildCollections } = this.app.bajo.helper
  this.connections = await buildCollections({ ns: this.name, handler, dupChecks: ['name', 'path'] })
}

export default init

async function handler ({ item }) {
  const { error } = this.app.bajo.helper
  const { isString, has } = this.app.bajo.helper._
  const { parsers } = this.helper
  if (!has(item, 'path')) throw error('Connection must have a path')
  item.baudRate = item.baudRate ?? 38400
  if (isString(item.parser)) item.parser = { name: item.parser }
  item.parser = item.parser ?? { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!parsers.includes(item.parser.name)) throw error('Unknown parser \'%s\'', item.parser.name)
  item.broadcast = item.broadcast ?? false
}

async function init () {
  const { buildCollections } = this.app.bajo.helper
  this.connections = await buildCollections({ ns: this.name, handler, dupChecks: ['name', 'path'] })
}

export default init

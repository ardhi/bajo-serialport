import * as sp from 'serialport'
const { SerialPort } = sp

async function start () {
  const { importPkg, getConfig } = this.bajo.helper
  const { omit, camelCase } = await importPkg('lodash-es')
  const { events } = this.bajoSerialport.helper
  const { emit } = this.bajoEmitter.helper
  const config = getConfig('bajoSerialport')
  const instances = []

  for (const c of config.connections) {
    const opts = omit(c, ['name', 'options'])
    const client = { port: new SerialPort(opts) }
    const optsParser = omit(c.options.parser, ['name', 'broadcastPool', 'decodeNmea'])
    const Parser = sp.default[c.options.parser.name]
    client.parser = client.port.pipe(new Parser(optsParser))
    for (const k in events) {
      for (const evt of events[k]) {
        client[k].on(evt, async (...args) => {
          const key = camelCase(`${k} ${evt}`)
          if (key === 'parserData') {
            let [message] = args
            try {
              if (c.options.decodeNmea) message = await this.bajoCodec.helper.decodeNmea({ message })
            } catch (err) { console.log(err) }
            emit(`bajoSerialport.${key}`, c, message)
          } else emit(`bajoSerialport.${key}`, c, ...args)
        })
      }
    }
    instances.push({ name: c.name, client })
  }
  this.bajoSerialport.instances = instances
}

export default start

import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'

async function start () {
  const { _, getConfig, emit } = this.bajo.helper
  const { events } = this.bajoSerialport.helper
  const config = getConfig('bajoSerialport')
  const instances = []

  for (const c of config.connections) {
    const opts = _.omit(c, ['name', 'options'])
    const client = { port: new SerialPort(opts) }
    client.parser = client.port.pipe(new ReadlineParser({
      delimiter: '\r\n'
    }))
    for (const k in events) {
      for (const evt of events[k]) {
        client[k].on(evt, async (...args) => {
          const key = _.camelCase(`${k} ${evt}`)
          emit(`bajoSerialport:${key}`, c, ...args)
        })
      }
    }
    instances.push({ name: c.name, client })
  }
  this.bajoSerialport.instances = instances
}

export default start

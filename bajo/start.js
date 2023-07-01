import * as sp from 'serialport'
const { SerialPort } = sp

async function start () {
  const { getPkg, getConfig } = this.bajo.helper
  const _ = await getPkg('lodash')
  const { events } = this.bajoSp.helper
  const { emit } = this.bajoEmitter.helper
  const config = getConfig('bajoSp')
  const instances = []

  for (const c of config.connections) {
    const opts = _.omit(c, ['name', 'options'])
    const client = { port: new SerialPort(opts) }
    const optsParser = _.omit(c.options.parser, ['name'])
    const parser = sp.default[c.options.parser.name]
    client.parser = client.port.pipe(new parser(optsParser))
    for (const k in events) {
      for (const evt of events[k]) {
        client[k].on(evt, async (...args) => {
          const key = _.camelCase(`${k} ${evt}`)
          emit(`bajoSp.${key}`, c, ...args)
        })
      }
    }
    instances.push({ name: c.name, client })
  }
  this.bajoSp.instances = instances
}

export default start

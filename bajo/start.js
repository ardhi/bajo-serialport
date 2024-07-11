import * as sp from 'serialport'
const { SerialPort } = sp

async function start () {
  const { omit, camelCase } = this.app.bajo.lib._
  const { emit } = this.app.bajoEmitter

  for (const c of this.connections) {
    const opts = omit(c, ['name', 'parser', 'broadcast'])
    c.instance = { port: new SerialPort(opts) }
    const optsParser = omit(c.parser, ['name'])
    const Parser = sp.default[c.parser.name]
    c.instance.parser = c.instance.port.pipe(new Parser(optsParser))
    for (const k in this.events) {
      for (const evt of this.events[k]) {
        c.instance[k].on(evt, async (...args) => {
          const key = camelCase(`${k} ${evt}`)
          if (key === 'parserData') {
            const [message] = args
            emit(`bajoSerialport.${key}`, c, message)
          } else emit(`bajoSerialport.${key}`, c, ...args)
        })
      }
    }
  }
}

export default start

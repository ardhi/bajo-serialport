import * as sp from 'serialport'
const { SerialPort } = sp

async function start () {
  const { runHook } = this.app.bajo
  const { omit, camelCase } = this.app.bajo.lib._

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
            if (this.app.bajoEmitter) this.app.bajoEmitter.emit(`${this.name}.${key}`, c, message)
            await runHook(`${this.name}:${camelCase('on ' + key)}`, c, message)
          } else {
            if (this.app.bajoEmitter) this.app.bajoEmitter.emit(`${this.name}.${key}`, c, ...args)
            await runHook(`${this.name}:${camelCase('on ' + key)}`, c, ...args)
          }
        })
      }
    }
  }
}

export default start

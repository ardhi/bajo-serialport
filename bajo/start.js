import * as sp from 'serialport'
const { SerialPort } = sp

async function start () {
  const { callHelperOrHandler } = this.app.bajo.helper
  const { omit, camelCase } = this.app.bajo.helper._
  const { events } = this.helper
  const { emit } = this.app.bajoEmitter.helper

  for (const c of this.connections) {
    const opts = omit(c, ['name', 'options', 'broadcast'])
    c.instance = { port: new SerialPort(opts) }
    const optsParser = omit(c.options.parser, ['name', 'decodeNmea'])
    const Parser = sp.default[c.options.parser.name]
    c.instance.parser = c.instance.port.pipe(new Parser(optsParser))
    for (const k in events) {
      for (const evt of events[k]) {
        c.instance[k].on(evt, async (...args) => {
          const key = camelCase(`${k} ${evt}`)
          if (key === 'parserData') {
            let [message] = args
            try {
              if (c.options.decodeNmea) {
                const transformer = c.options.decodeNmea.transformer ? (await callHelperOrHandler(c.options.decodeNmea.transformer)) : undefined
                const sentences = c.options.sentences
                message = await callHelperOrHandler(c.options.decodeNmea.decoder, { message, sentences, transformer })
              }
            } catch (err) { console.log(err) }
            emit(`bajoSerialport.${key}`, c, message)
          } else emit(`bajoSerialport.${key}`, c, ...args)
        })
      }
    }
  }
}

export default start

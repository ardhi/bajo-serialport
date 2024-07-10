async function exit () {
  if (this.connections.length === 0) return
  for (const c of this.connections) {
    if (!c.instance) continue
    await c.instance.port.close()
  }
}

export default exit

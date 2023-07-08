async function exit () {
  if (this.bajoSerialport.instances.length === 0) return
  for (const i of this.bajoSerialport.instances) {
    await i.client.port.close()
  }
}

export default exit
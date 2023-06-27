async function exit () {
  if (this.bajoSp.instances.length === 0) return
  for (const i of this.bajoSp.instances) {
    await i.client.port.close()
  }
}

export default exit
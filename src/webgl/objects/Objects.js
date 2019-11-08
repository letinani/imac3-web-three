import { Object3D, MeshPhysicalMaterial, Color } from 'three'

import { datGui } from 'utils/debug'
import Bobby from './Bobby'

export default class Objects extends Object3D {
  constructor () {
    super()

    this.colors = {
      primary: '#63bff0',
      emissive: '#000000'
    }

    this.initMaterial()
    this.addMaterialGui()

    // const myToonMat = new Color('hsl('+Math.round(Math.random()*255)+',100%,60%)')

    // const primitives = datGui.addFolder('Primitives');
    const count = 125
    for (let i = 0; i < count; i++) {
      const bobby = new Bobby({
        material: this.myMat
      })
      bobby.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
      this.add(bobby)
    }
  }

  initMaterial () {
    this.myMat = new MeshPhysicalMaterial({
      color: new Color(this.colors.primary),
      metalness: 0.5,
      roughness: 0.1
    })
  }

  addMaterialGui () {
    const matFolder = datGui.addFolder('Objects Material')
    matFolder.add(this.myMat, 'metalness').min(0).max(1).step(0.1)
    matFolder.add(this.myMat, 'roughness').min(0).max(1).step(0.1)
    matFolder.addColor(this.colors, 'primary').onChange((value) => {
      this.myMat.color = new Color(value)
    })
    matFolder.addColor(this.colors, 'emissive').onChange((value) => {
      console.log(value)
      this.myMat.emissive = new Color(value)
    })
  }

  update () {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      child.update()
    }
  }
}

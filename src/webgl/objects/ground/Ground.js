import { Object3D, PlaneBufferGeometry, RawShaderMaterial, Mesh, DoubleSide, Color } from 'three'

import vertexShader from './shaders/ground.vs'
import fragmentShader from './shaders/ground.fs'

import { datGui } from 'utils/debug'

export default class Ground extends Object3D {
  constructor (size) {
    super()
    const geometry = new PlaneBufferGeometry(size, size, 512, 512)

    this.colors = {
      up: '#4f38ff',
      down: '#f0f0f0'
    }

    this.material = new RawShaderMaterial({
      uniforms: {
        uColorUp: { value: new Color(this.colors.up) },
        uColorDown: { value: new Color(this.colors.down) },
        uWave: { value: 40.0 },
        uVelocity: { value: 1.0 },
        uAmplitude: { value: 3.0 },
        uTime: { value: 1.0 }
      },
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: DoubleSide
    })
    var plane = new Mesh(geometry, this.material)

    plane.rotation.x = Math.PI * 0.5
    this.add(plane)

    this.addGui()
  }

  addGui () {
    const folder = datGui.addFolder('Ground')
    folder.add(this, 'visible')

    folder.addColor(this.colors, 'up').onChange((value) => {
      this.material.uniforms.uColorUp.value = new Color(value)
    })

    folder.addColor(this.colors, 'down').onChange((value) => {
      this.material.uniforms.uColorDown.value = new Color(value)
    })
  }

  onBeat (audio) {
    // this.material.uniforms.uAmplitude.value = audio.volume
  }

  update (audio) {
    this.material.uniforms.uTime.value += 0.01
    // this.material.uniforms.uAmplitude.value = audio.volume
  }
}

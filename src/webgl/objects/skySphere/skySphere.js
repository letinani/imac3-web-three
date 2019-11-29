import {
  Mesh,
  SphereBufferGeometry,
  RawShaderMaterial,
  BackSide,
  Color
} from 'three'

import fragmentShader from './shaders/skySphere.fs'
import vertexShader from './shaders/skySphere.vs'

import { datGui } from 'utils/debug'

export default class Sky extends Mesh {
  constructor (options = {}) {
    const colors = {
      up: options.colorUp ? options.colorUp : '#08183e',
      middle: options.colorMiddle ? options.colorMiddle : '#011f28',
      down: options.colorDown ? options.colorDown : '#246b67'
    }

    const radius = options.radius || 50

    const geometry = new SphereBufferGeometry(radius, 32, 32)

    const material = new RawShaderMaterial({
      uniforms: {
        uColorUp: {
          value: new Color(colors.up)
        },
        uColorMiddle: {
          value: new Color(colors.middle)
        },
        uColorDown: {
          value: new Color(colors.down)
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: BackSide
    })

    super(geometry, material)

    this.colors = colors
    // this.rotation.x = -1.17

    this.addGui()
  }

  addGui () {
    const skyGui = datGui.addFolder('SkySphere')
    skyGui.add(this, 'visible')

    skyGui.addColor(this.colors, 'up').onChange((value) => {
      this.material.uniforms.uColorUp.value = new Color(value)
    })

    skyGui.addColor(this.colors, 'middle').onChange((value) => {
      this.material.uniforms.uColorMiddle.value = new Color(value)
    })

    skyGui.addColor(this.colors, 'down').onChange((value) => {
      this.material.uniforms.uColorDown.value = new Color(value)
    })
  }
}

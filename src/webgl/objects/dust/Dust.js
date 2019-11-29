import { Group, BufferGeometry, ShaderMaterial, Color, Points, BufferAttribute } from 'three'

import { randFloat, randInt } from 'utils/maths'
import palettes from 'nice-color-palettes'

import fragmentShader from './shaders/dust.frag'
import vertexShader from './shaders/dust.vert'

import preloader from 'utils/preloader'

export default class Dust extends Group {
  constructor () {
    super()

    this.geom = new BufferGeometry()
    this.populate()

    this.mat = new ShaderMaterial({
      uniforms: {
        uTexture: { value: preloader.getTexture('p1') },
        uTime: { value: 0.0 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true
      // depthTest: false
    })

    const mesh = new Points(this.geom, this.mat)
    this.add(mesh)
  }

  populate () {
    const particleCount = 2500
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const bounds = {
      x: 40,
      y: 40,
      z: 40
    }

    for (let i = 0, j = 0; i < particleCount; i++) {
      const color = new Color(palettes[0][randInt(0, 4)])

      positions[j] = randFloat(-bounds.x, bounds.x)
      positions[j + 1] = randFloat(-bounds.y, bounds.y)
      positions[j + 2] = randFloat(-bounds.z, bounds.z)

      velocities[j] = randFloat(-2, 2)
      velocities[j + 1] = randFloat(-2, 2)
      velocities[j + 2] = randFloat(-2, 2)

      color.toArray(colors, j)

      sizes[i] = randFloat(10, 25)

      j += 3
    }

    this.geom.addAttribute('position', new BufferAttribute(positions, 3))
    this.geom.addAttribute('velocity', new BufferAttribute(velocities, 3))
    this.geom.addAttribute('color', new BufferAttribute(colors, 3))
    this.geom.addAttribute('size', new BufferAttribute(sizes, 1))
  }

  update () {
    this.mat.uniforms.uTime.value += 0.01
    this.mat.uniformsNeedUpdate = true
  }
}

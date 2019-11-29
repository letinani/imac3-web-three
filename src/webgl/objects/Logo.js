import { Object3D, MeshBasicMaterial, Mesh } from 'three'
import preloader from 'utils/preloader'

export default class Logo extends Object3D {
  constructor () {
    super()
    const gltf = preloader.getGLTF('logoIMAC')

    this.logoText = new Mesh(gltf.scene.children[0].geometry, new MeshBasicMaterial({ color: '#0000FF' }))
    this.logoText.scale.set(2, 2, 2)
    this.add(this.logoText)
    this.logoIcon = new Mesh(gltf.scene.children[1].geometry, new MeshBasicMaterial({ color: '#FFFFFF' }))
    this.logoIcon.scale.set(2, 2, 2)
    this.add(this.logoIcon)
  }
}

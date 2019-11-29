import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  PointLightHelper,
  AmbientLight
} from 'three'

import {
  OrbitControls
} from './controls/OrbitControls'

import Stats from 'stats.js'

import Objects from './objects/Objects'
import Ground from './objects/ground/Ground'
import Logo from './objects/Logo'
import Dust from './objects/dust/Dust'
import SkySphere from './objects/SkySphere/SkySphere'

import createComposer from './postfx/Composer'

import audio from 'utils/audio'
import preloader from 'utils/preloader'

export default class Webgl {
  constructor ($parent) {
    this.currentTime = 0
    this.render = this.render.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onBeat = this.onBeat.bind(this)
    this.onPreloader = this.onPreloader.bind(this)

    this.isReady = false

    this.renderer = new WebGLRenderer({
      antialias: true
    })
    this.renderer.setClearColor(0x333333, 1)
    this.renderer.preserveDrawingBuffer = true

    $parent.appendChild(this.renderer.domElement)

    this.scene = new Scene()

    this.camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 15
    this.scene.add(this.camera)

    this.composer = createComposer(this.scene, this.camera, this.renderer)

    this.light = new PointLight(0xffffff, 1, 100)
    this.scene.add(this.light)

    this.ambient = new AmbientLight(0x666666)
    this.scene.add(this.ambient)

    this.pointLightHelper = new PointLightHelper(this.light, 1)
    this.scene.add(this.pointLightHelper)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.stats = new Stats()
    this.stats.showPanel(0)
    $parent.appendChild(this.stats.dom)

    this.onResize()

    // if you don't want to hear the music, but keep analysing it, set 'shutup' to 'true'!
    audio.start({ live: false, shutup: true, showPreview: true, debug: false })
    audio.onBeat.add(this.onBeat)

    // this.init()

    var manifest = [
      { type: 'GLTFModel', url: './assets/models/logo-imac2.gltf', id: 'logoIMAC' },
      { type: 'Texture', url: './assets/textures/particle1.png', id: 'p1' }
    ]

    preloader.load(manifest, this.onPreloader)

    window.addEventListener('resize', this.onResize, false)
  }

  onPreloader () {
    this.isReady = true
    this.initObjects()
    this.render()
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.effectComposer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  onBeat () {
    this.ground.onBeat(audio)
  }

  initObjects () {
    this.objects = new Objects()
    this.objects.position.set(0, 4, 0)
    // this.scene.add(this.objects)

    this.dust = new Dust()
    this.scene.add(this.dust)

    this.sky = new SkySphere({ radius: 20 })
    this.scene.add(this.sky)

    this.ground = new Ground(50)
    this.ground.position.set(0, -4, 0)
    this.scene.add(this.ground)

    this.logo = new Logo()
    this.logo.position.set(0, 1, 0)
    this.scene.add(this.logo)
  }

  render () {
    if (!this.isReady) return
    console.log('oo')
    this.stats.begin()

    this.currentTime++

    this.controls.update()

    this.scene.children.forEach((child) => {
      if (child.update) child.update(audio)
    })
    // this.objects.update()
    // this.ground.update()

    this.light.position.y = Math.cos(this.currentTime * 0.02) * 20
    this.light.position.x = Math.sin(this.currentTime * 0.02) * 20

    // this.renderer.render( this.scene, this.camera )
    this.composer.render()
    this.stats.end()
    requestAnimationFrame(this.render)
  }
}

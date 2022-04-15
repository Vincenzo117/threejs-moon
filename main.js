import './style.css' 
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

/**
 * Loading Manager
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}
loadingManager.onProgress = () => {
    console.log('loading in progress')
}
loadingManager.onError = () => {
    console.log('loading error')
}

/**
 * Moon Textures Loading
 */
const textureLoader = new THREE.TextureLoader(loadingManager)
const moonColorTexture = textureLoader.load('./assets/moon-texture/lroc_color_poles_4k.png')
const moonDisplacmentTexture = textureLoader.load('./assets/moon-texture/ldem_16_uint.png')

/**
 * Debug
 */
const gui = new lil.GUI({ width: 400 })
gui.hide()

window.addEventListener('keydown', (event) => {
    if (event.key == 'g') {
        gui._hidden ? gui.show() : gui.hide()
    }
})

const debugObject = {
    moonScale: 1
}

gui
    .add(debugObject, 'moonScale')
    .min(0.5)
    .max(10)
    .step(0.1)
    .name('moon size')

/**
 * Base Scene
 */
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()


/**
 * Moon Object
 */
const moonMaterial = new THREE.MeshStandardMaterial()
moonMaterial.map = moonColorTexture
moonMaterial.displacementMap = moonDisplacmentTexture
moonMaterial.displacementScale = 0
gui
    .add(moonMaterial, 'displacementScale')
    .min(0)
    .max(2)
    .step(0.001)

const moonGeometry = new THREE.SphereBufferGeometry(10, 100, 100)

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)

scene.add(moonMesh)


/**
 * Lightning
 */
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.z = 30

scene.add(light)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Fullscreen
 */
window.addEventListener('keydown', (event) => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (event.key == 'f') {
        if (!fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen()
            }
            else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen()
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
        }
    }

})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 40
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Moon update
    moonMesh.scale.set(debugObject.moonScale, debugObject.moonScale, debugObject.moonScale)

    // Point light
    // pointLight.position.x = elapsedTime *20

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
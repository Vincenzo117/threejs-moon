import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DeviceOrientationControls } from './Utils/DeviceOrientationControl.js'
import Experience from './Experience.js'

export default class Camera 
{
    constructor() 
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera controls')
        }

        this.setInstance()
        this.setOrbitControls()
        this.setOrientationControls()
        this.setListener()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            45, 
            this.sizes.width / this.sizes.height,
            0.1, 
            1000
        ) 
        this.instance.position.z = 10
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.orbitControls = new OrbitControls(this.instance, this.canvas)
        this.orbitControls.enableDamping = true
        this.orbitControls.enabled = false

        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.orbitControls, 'enabled')
                .name('orbit controls')
        }
    }

    setOrientationControls()
    {
        this.orientationControls = new DeviceOrientationControls(this.instance)
        this.orientationControls.enableDamping = true
        this.orientationControls.enabled = false

        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.orientationControls, 'enabled')
                .name('orientation controls')
        }
    }

    setListener()
    {
        if(this.sizes.width > 500)
        {
            window.addEventListener('mousemove', (event) =>
            {
                const x = event.clientX / this.sizes.width - 0.5
                this.instance.position.x = x 
                this.instance.lookAt(new THREE.Vector3(0, 0, 0))
            })
        }

        // Only working on firefox mobile
        window.addEventListener('deviceorientation', (event) =>
        {
            const x = ((event.gamma + 90) / 180) - 0.5
            const y = - (((event.beta + 180) / 360) - 0.5)
            this.instance.position.x = x * 5
            this.instance.position.y = y * 10
            this.instance.lookAt(new THREE.Vector3(0, 0, 0))
        })
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.orbitControls.update()
        this.orientationControls.update()
    }
} 
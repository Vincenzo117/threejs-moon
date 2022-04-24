import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DeviceOrientationControls } from './DeviceOrientationControls.js'
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

        this.setInstance()
        this.setOrbitControls()
        this.setDeviceOrientationControls()
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
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enabled = this.debug.active
    }

    setDeviceOrientationControls()
    {
        this.orientationControls = new DeviceOrientationControls(this.instance)
        this.controls.enableDamping = true
    }

    setListener()
    {
        window.addEventListener('mousemove', (event) =>
        {
            const cursor = 
            {
                x: event.clientX / this.sizes.width - 0.5,
                y: - (event.clientX / this.sizes.height - 0.5),
            }
            this.instance.position.x = cursor.x * 2
            this.instance.lookAt(new THREE.Vector3(0, 0, 0))
        })

        window.addEventListener('deviceorientation', (event) =>
        {
            console.log(event.alpha);
        })
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        this.orientationControls.update()
    }
} 
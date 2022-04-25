import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

        window.addEventListener('deviceorientation', (event) =>
        {
            const x = ((event.gamma + 90) / 180) - 0.5
            const y = - (((event.beta + 180) / 360) - 0.5)
            this.instance.position.x = x * 3
            this.instance.position.y = y * 6
            this.instance.lookAt(new THREE.Vector3(0, 0, 0))
        })
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
} 
import * as THREE from 'three'
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
            100
        ) 
        this.instance.position.z = 10
        this.scene.add(this.instance)
    }

    setListener()
    {
        this.cursorX = 0

        if(this.sizes.width > 500)
        {
            window.addEventListener('mousemove', (event) =>
            {
                this.cursorX = event.clientX / this.sizes.width - 0.5
            })
        }

        this.orientation = {
            x: 0,
            y: 0
        }

        window.addEventListener('deviceorientation', (event) =>
        {
            this.orientation.x = ((event.gamma + 90) / 180) - 0.5
            this.orientation.y = - (((event.beta + 180) / 360) - 0.5)
        })
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if(this.cursorX) {
            this.instance.position.x += (this.cursorX - this.instance.position.x) * 0.1
        } else if(this.orientation.x || this.orientation.y) {
            this.instance.position.x += (this.orientation.x - this.instance.position.x) * 0.5
            this.instance.position.y += (this.orientation.y - this.instance.position.y) 
        }
        this.instance.lookAt(new THREE.Vector3(0, 0, 0))
    }
} 
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import EventEmitter from '../Utils/EventEmitter'
import Experience from '../Experience'

export default class NextDayButton extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.moonData = this.experience.world.moonData

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setListener()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            '>>',
            {
                font: this.resources.items.phaseText,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3,
            }
        )
            
        this.geometry.center()
    }

    setMaterial()
    {
        this.material = new THREE.MeshMatcapMaterial(
            {
                matcap: this.resources.items.textMatcap
            })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(2.8, - 3.42, 0)
        this.mesh.rotation.x = - Math.PI * 0.15
        this.scene.add(this.mesh)
    }

    setListener()
    {
        window.addEventListener('keyup', (event) =>
        {
            if(event.key == 'ArrowRight')
            {
                gsap.fromTo(this.mesh.rotation, {x: - Math.PI * 0.15}, { duration: 1.4,  x: Math.PI * 2 - Math.PI * 0.15, ease: 'elastic' })
                this.trigger('nextDay')
            }
        })
    }
}
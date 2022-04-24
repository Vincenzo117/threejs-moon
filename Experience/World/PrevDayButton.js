import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import EventEmitter from '../Utils/EventEmitter'
import Experience from '../Experience'

export default class PrevDayButton extends EventEmitter
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
        this.setRaycaster()
        this.setListener()
        this.resize()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            '<<',
            {
                font: this.resources.items.text,
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
        this.mesh.position.set(- 2.8, - 3.1, 0)
        this.mesh.rotation.x = - Math.PI * 0.15
        this.scene.add(this.mesh)
    }

    setRaycaster()
    {
        this.raycaster = new THREE.Raycaster()
    }

    setListener()
    {
        // Arrow keys
        window.addEventListener('keyup', (event) =>
        {
            if(event.key == 'ArrowLeft')
            {
                this.prevDay()
            }
        })

        // Click on arrows
        window.addEventListener('click', (event) =>
        {
            const pointer = new THREE.Vector2()
            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
	        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1
            this.raycaster.setFromCamera(pointer, this.camera.instance)
            if (this.raycaster.intersectObject(this.mesh).length > 0)
            {
                this.prevDay()
            }
        })

        // Mobile swipe
        let touchStartX = 0
        let touchEndX = 0
        window.addEventListener('touchstart', (event) => 
        {
            touchStartX = event.changedTouches[0].screenX
        })
        window.addEventListener('touchend', (event) => 
        {
            touchEndX = event.changedTouches[0].screenX
            if(touchEndX < touchStartX)
            {
                this.prevDay()
            }
        })
    }

    prevDay()
    {
        gsap.fromTo(this.mesh.rotation, {x: - Math.PI * 0.15}, { duration: 1.8,  x: Math.PI  - Math.PI * 0.15, ease: 'elastic' })
        this.trigger('prevDay')
    }

    resize()
    {   
        if(this.sizes.width < 420)
        {
            this.mesh.scale.set(0.45, 0.45, 0.45)
            this.mesh.position.x = - 1
        }
        else if(this.sizes.width < 560)
        {
            this.mesh.scale.set(0.55, 0.55, 0.55)
            this.mesh.position.x = - 1.3
        }
        else if(this.sizes.width < 720)
        {
            this.mesh.scale.set(0.6, 0.6, 0.6)
            this.mesh.position.x = - 1.8
        }
        else if(this.sizes.width < 880)
        {
            this.mesh.scale.set(0.8, 0.8, 0.8)
            this.mesh.position.x = - 2.2
        } 
        else 
        {
            this.mesh.scale.set(1, 1, 1)
            this.mesh.position.x = - 2.8
        }
    }
}
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import Experience from '../Experience.js'

export default class PhaseText
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.moonData = this.experience.world.moonData
        this.prevPhase = this.moonData.phaseName

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.resize()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            this.moonData.phaseName,
            {
                font: this.resources.items.text,
                size: 0.8,
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
                matcap: this.resources.items.textMatcap,
            })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 3.2
        this.mesh.rotation.x = Math.PI * 0.15
        this.scene.add(this.mesh)
    }

    updateData()
    {
        if(this.prevPhase != this.moonData.phaseName)
        {
            this.scene.remove(this.mesh)
            this.setGeometry()
            this.setMaterial()
            this.setMesh()
            this.resize()
            gsap.fromTo(this.mesh.rotation,{x: this.mesh.rotation.x + Math.PI }, { duration: 0.7,  x: this.mesh.rotation.x + Math.PI * 2, ease: 'expo' })
            this.prevPhase = this.moonData.phaseName
        }
    }

    resize()
    {   
        if(this.sizes.width < 420)
        {
            this.mesh.scale.set(0.4, 0.4, 0.4)
        }
        else if(this.sizes.width < 580)
        {
            this.mesh.scale.set(0.45, 0.45, 0.45)
        }
        else if(this.sizes.width < 750)
        {
            this.mesh.scale.set(0.6, 0.6, 0.6)
        }
        else if(this.sizes.width < 990)
        {
            this.mesh.scale.set(0.75, 0.75, 0.75)
        } 
        else 
        {
            this.mesh.scale.set(1, 1, 1)
        }
    }
}
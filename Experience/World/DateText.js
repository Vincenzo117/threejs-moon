import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Experience from '../Experience'

export default class DateText
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.moonData = this.experience.world.moonData

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.resize()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            this.moonData.fullDate,
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
        this.mesh.position.y = - 3.1
        this.mesh.rotation.x = - Math.PI * 0.15
        this.scene.add(this.mesh)
    }
    
    updateData()
    {
        this.scene.remove(this.mesh)
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.resize()
    }

    resize()
    {   
        if(this.sizes.width < 420)
        {
            this.mesh.scale.set(0.35, 0.35, 0.35)
        }
        else if(this.sizes.width < 560)
        {
            this.mesh.scale.set(0.45, 0.45, 0.45)
        }
        else if(this.sizes.width < 720)
        {
            this.mesh.scale.set(0.6, 0.6, 0.6)
        }
        else if(this.sizes.width < 880)
        {
            this.mesh.scale.set(0.8, 0.8, 0.8)
        } 
        else 
        {
            this.mesh.scale.set(1, 1, 1)
        }
    }
}
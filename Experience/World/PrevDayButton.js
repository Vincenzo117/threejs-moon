import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import Experience from '../Experience'

export default class PrevDayButton
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.moonData = this.experience.moonData

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            '<<',
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
        this.mesh.position.set(- 3, - 3.5, - 1)
        this.scene.add(this.mesh)
    }

    update()
    {
        window.addEventListener('mousemove', (event) =>
        {
            this.target = new THREE.Vector3()

            this.target.x += (event.clientX - (this.sizes.width / 2) - this.target.x) * 0.001
            this.target.y = this.mesh.position.y
            this.target.z = this.camera.instance.position.z
            
            this.mesh.lookAt(this.target)
        })       
    }

    rotate()
    {
        gsap.to(this.mesh.rotation, { duration: 1,  x: Math.PI * 2 })
    }
}
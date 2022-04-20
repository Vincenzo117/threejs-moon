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
        this.setListener()
    }

    setGeometry()
    {
        this.geometry = new TextGeometry(
            this.moonData.phaseName,
            {
                font: this.resources.items.phaseText,
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
                matcap: this.resources.items.textMatcap
            })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = - 2.2
        this.mesh.position.z = - 1
        this.scene.add(this.mesh)
    }

    setListener()
    {
        window.addEventListener('mousemove', (event) =>
        {
            this.target = new THREE.Vector3()

            this.target.x += ( event.clientX - (this.sizes.width / 2) - this.target.x) * 0.0008
            this.target.y = this.mesh.position.y
            this.target.z = this.camera.instance.position.z

            this.mesh.lookAt(this.target)
        })
    }

    updateData()
    {
        if(this.prevPhase != this.moonData.phaseName)
        {
            this.scene.remove(this.mesh)
            this.setGeometry()
            this.setMaterial()
            this.setMesh()
            gsap.to(this.mesh.rotation, { duration: 1.4,  x: this.mesh.rotation.x + Math.PI * 2, ease: 'bounce' })
            this.prevPhase = this.moonData.phaseName
        }
    }
}
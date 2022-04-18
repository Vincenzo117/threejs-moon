import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
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
        this.moonData = this.experience.moonData
        this.text = this.moonData.phaseName

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
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
        this.mesh.position.y = - 2.5
        this.mesh.position.z = - 1
        this.scene.add(this.mesh)
    }

    update()
    {
        window.addEventListener('mousemove', (event) =>
        {
            this.target = new THREE.Vector3()

            this.target.x += ( event.clientX - (this.sizes.width / 2) - this.target.x) * 0.002
            this.target.y = this.mesh.position.y
            this.target.z = this.camera.instance.position.z

            this.mesh.lookAt(this.target)
        })
    }

    updateData()
    {
        if(this.text != this.moonData.phaseName)
        {
            this.scene.remove(this.mesh)
            this.setGeometry()
            this.setMaterial()
            this.setMesh()
            this.text = this.moonData.phaseName
        }
    }
}
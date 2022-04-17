import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Experience from '../Experience.js'
import MoonData from '../../Data/MoonData.js'

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
        this.moonData = new MoonData()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Text')
        }

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
            }
        )
        

        // Debug
        if(this.debugFolder.active)
        {
            this.debugFolder
                .addColor(this.material, 'color')
        }
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
}
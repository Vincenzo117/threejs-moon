import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Moon
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Moon')
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(2, 100, 100)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.moonColorTexture

        this.textures.displacement = this.resources.items.moonDispTexture
    }
    
    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({ 
            map: this.textures.color,
            displacementMap: this.textures.displacement
        })
        
        this.material.displacementScale = 0

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.material, 'displacementScale')
                .min(0)
                .max(1)
                .step(0.01)
                .name('displacement scale')
        }
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = 0
        this.mesh.rotation.y = 4.5
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}
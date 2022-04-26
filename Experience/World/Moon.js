import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Moon
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
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
        this.resize()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(2, 250, 250)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.moonColorTexture

        this.textures.bump = this.resources.items.moonBumpTexture
    }
    
    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({ 
            map: this.textures.color,
            bumpMap: this.textures.bump,
        })
        
        this.material.bumpScale = 0.04

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.material, 'bumpScale')
                .min(0)
                .max(1)
                .step(0.01)
                .name('bump scale')
        }
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.y = 4.5
        this.scene.add(this.mesh)
    }

    resize()
    {   
        if(this.sizes.width < 400)
        {
            this.mesh.scale.set(0.8, 0.8, 0.8)
        }
        else if(this.sizes.width < 600)
        {
            this.mesh.scale.set(0.85, 0.85, 0.85)
        } 
        else 
        {
            this.mesh.scale.set(1, 1, 1)
        }
    }
}
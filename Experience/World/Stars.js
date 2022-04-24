import * as THREE from 'three'
import Experience from '../Experience'

export default class Stars
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        this.vertices = new Float32Array(12000)
        this.colors = new Float32Array(12000)

        for(let i = 0; i < 12000; i++)
        {
            const i3 = i * 3
            const x = i3 + 0
            const y = i3 + 1
            const z = i3 + 2

            this.vertices[x] = (Math.random() - 0.5) * 50
            this.colors[x] = 0.8+ Math.random() * 0.2
            
            this.vertices[y] = (Math.random() - 0.5) * 32  
            this.colors[y] = 0.8 + Math.random() * 0.2 

            this.vertices[z] = (Math.random() - 0.5) * 32 - 20
            this.colors[z] = 0.8 + Math.random() * 0.2
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute( this.vertices, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true,
            vertexColors: true
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}
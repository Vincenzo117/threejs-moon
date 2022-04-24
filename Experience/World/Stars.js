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

        this.vertices = new Float32Array(9000)

        for(let i = 0; i < 9000; i++)
        {
            if(i % 3 === 2)
            {
                // z
                this.vertices[i] = (Math.random() - 0.5) * 12 - 10
            } else  if(i % 3 === 1)
            {
                // y
                this.vertices[i] = (Math.random() - 0.5) * 25
            } else
            {
                // x
                this.vertices[i] = (Math.random() - 0.5) * 50
            }
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute( this.vertices, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: 0.02,
            sizeAttenuation: false
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}
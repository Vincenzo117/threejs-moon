import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0.8)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.fat = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 0, 100)
        this.scene.add(this.sunLight)
    }

    setEnvironmentMap()
    {
        // EnvironmentMap setup
    }
}
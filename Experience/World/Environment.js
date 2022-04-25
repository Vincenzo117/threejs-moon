import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'

export default class Environment 
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.moonData = this.experience.world.moonData

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Lights')
        }

        this.setAmbientLight()
        this.setSunLight()
        this.setSunLightPosition()
        this.setEnvironmentMap()
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
        this.scene.add(this.ambientLight)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder    
                .add(this.ambientLight, 'intensity')
                .min(0)
                .max(3)
                .step(0.01)
                .name('ambient light intensity')
        }
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.35)
        this.sunLight.castShadow = true
        this.sunLight.shadow.radius = 40
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.y = 0
        this.scene.add(this.sunLight)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .min(0)
                .max(5)
                .step(0.01)
                .name('sunlight intensity');
        }   
    }

    setSunLightPosition()
    {
        this.sunLight.position.x = Math.cos(this.moonData.rotationDegrees) * 10
        this.sunLight.position.z = Math.sin(this.moonData.rotationDegrees) * 10
    }

    setEnvironmentMap()
    {
        // EnvironmentMap setup
    }

    updateData()
    {
        gsap.to(this.sunLight.position,{ duration: 1, x: Math.cos(this.moonData.rotationDegrees) * 10})
        gsap.to(this.sunLight.position,{ duration: 1, z: Math.sin(this.moonData.rotationDegrees) * 10})
    }

}
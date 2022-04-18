import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment 
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.moonData = this.experience.moonData

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Sun Light')
        }

        this.setSunLight()
        this.setSunLightPosition()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.fat = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.scene.add(this.sunLight)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .min(0)
                .max(5)
                .step(0.01)
                .name('light intensity');
        }   
    }

    setSunLightPosition()
    {
        this.sunLight.position.x = Math.cos(this.moonData.rotationDegrees) * 100
        this.sunLight.position.z = Math.sin(this.moonData.rotationDegrees) * 100
    }

    setEnvironmentMap()
    {
        // EnvironmentMap setup
    }

    updateData()
    {
        this.sunLight.position.x = Math.cos(this.moonData.rotationDegrees) * 100
        this.sunLight.position.z = Math.sin(this.moonData.rotationDegrees) * 100
    }

}
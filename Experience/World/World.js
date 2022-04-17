import Experience from '../Experience.js'
import Environment from './Environment.js'
import Moon from './Moon.js'
import PhaseText from './PhaseText.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources loading
        this.resources.on('ready', () =>
        {
            // Setup
            this.moon = new Moon()
            this.phaseText = new PhaseText()
            this.environment = new Environment()
        })
    }  

    update()
    {
        if(this.phaseText)
        {
            this.phaseText.update()
        }   
    }
}
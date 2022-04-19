import Experience from '../Experience.js'
import DateText from './DateText.js'
import Environment from './Environment.js'
import Moon from './Moon.js'
import NextDayButton from './NextDayButton.js'
import PhaseText from './PhaseText.js'
import PrevDayButton from './PrevDayButton.js'

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
            this.moon = new Moon()
            this.phaseText = new PhaseText()
            this.dateText = new DateText()
            this.nextDayButton = new NextDayButton()
            this.prevDayButton = new PrevDayButton()
            this.environment = new Environment()
        })

        
    }  

    update()
    {
        if(this.phaseText)
        {
            this.phaseText.update()
        }   
        if(this.dateText)
        {
            this.dateText.update()
        }
        if(this.nextDayButton)
        {
            this.nextDayButton.update()
        }
        if(this.prevDayButton)
        {
            this.prevDayButton.update()
        }
    }

    updateData()
    {
        this.phaseText.updateData()
        this.environment.updateData()
    }
}
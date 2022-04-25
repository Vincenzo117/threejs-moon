import stats from 'stats.js'
import Experience from '../Experience'

export default class StatsPanel
{
    constructor()
    {
        this.instance = new stats()
        this.experience = new Experience()
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.instance.showPanel(0)
            document.body.appendChild( this.instance.dom )
        }
    }

    statsBegin()
    {
        this.instance.begin()
    }

    statsEnd()
    {
        this.instance.end()
    }
}
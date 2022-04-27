import stats from 'stats.js'

export default class Stats
{
    constructor()
    {
        this.active = window.location.hash === '#debug'
        
        if(this.active)
        {
            this.instance = new stats()
            this.instance.showPanel(0)
            document.body.appendChild( this.instance.dom )
        }
    }
}
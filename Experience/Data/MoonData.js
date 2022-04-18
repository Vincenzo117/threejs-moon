import dayjs from 'dayjs'
import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'

export default class MoonData extends EventEmitter
{
    constructor() 
    {
        super()

        this.experience = new Experience()
        this.debug = this.experience.debug

        this.currentDate = 
        {
            year: dayjs().year(),
            month: dayjs().month(),
            day: dayjs().date()
        }

        this.updateData()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Time')

            this.debugFolder
                .add(this.currentDate, 'day')
                .min(0)
                .max(31)
                .step(1)
        }

        // New Date event
        if(this.debug.active)
        {
            this.debug.ui.onChange( event => 
                {
                    if (event.property == 'day')
                    {
                        this.updateData()
                        this.trigger('newDate')
                    }
                })
        }
    }

    updateData()
    {
        this.getDaysIntoCycle()
        this.getPhaseName()
        this.getRotationDegrees()
    }

    getDaysIntoCycle() 
    {
        let a = this.currentDate.year / 100
        let b = a / 4
        let c = 2 - a + b
        let e =  365.25 * (this.currentDate.year + 4716) 
        let f = 30.6001 * (this.currentDate.month + 1)
        let jd = c + this.currentDate.day + e + f - 1524.5

        let daySinceNew = jd - 2451549.5

        let cycles = daySinceNew / 29.53

        this.daysIntoCycle = Math.round((cycles % 1).toFixed(3) * 29.53)
    }

    getPhaseName() {
        if(this.daysIntoCycle == 29)
        {
            this.phaseName = 'New Moon'
        }
        if(this.daysIntoCycle > 0 && this.daysIntoCycle < 8)
        {
            this.phaseName = 'Waxing Crescent'
        }
        if(this.daysIntoCycle == 8)
        {
            this.phaseName = 'First Quarter'
        }
        if(this.daysIntoCycle > 8 && this.daysIntoCycle < 15)
        {
            this.phaseName = 'Waxing Gibbous'
        }
        if(this.daysIntoCycle == 15)
        {
            this.phaseName = 'Full Moon'
        }
        if(this.daysIntoCycle > 15 && this.daysIntoCycle < 22)
        {
            this.phaseName = 'Waning Gibbous'
        }
        if(this.daysIntoCycle == 22)
        {
            this.phaseName = 'Third Quarter'
        }
        if(this.daysIntoCycle > 22 && this.daysIntoCycle < 29)
        {
            this.phaseName = 'Waning Crescent'
        }
    }

    getRotationDegrees()
    {
        this.rotationDegrees = ((this.daysIntoCycle * Math.PI * 2) / 29.53) - Math.PI / 2
    }
}
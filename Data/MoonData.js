import dayjs, { Dayjs } from 'dayjs'

let instance = null

export default class MoonData 
{
    constructor() 
    {
        // Singletone class
        if (instance) {
            return instance
        }
        instance = this

        this.getDaysIntoCycle()
        this.getPhaseName()
    }

    getDaysIntoCycle() 
    {
        let a = dayjs().year() / 100
        let b = a / 4
        let c = 2 - a + b
        let e =  365.25 * (dayjs().year(), + 4716) 
        let f = 30.6001 * (dayjs().month() + 1)
        let jd = c + dayjs().date() + e + f - 1524.5

        let daySinceNew = jd - 2451549.5

        let cycles = daySinceNew / 29.53

        this.daysIntoCycle = Math.round((cycles % 1).toFixed(3) * 29.53)
    }

    getPhaseName() {
        if(this.daysIntoCycle == 0)
        {
            this.phaseName = 'New Moon'
        }
        if(0 < this.daysIntoCycle < 7)
        {
            this.phaseName = 'Waning Crescent'
        }
        if(this.daysIntoCycle == 7)
        {
            this.phaseName = 'Third Quarter'
        }
        if(7 < this.daysIntoCycle < 15)
        {
            this.phaseName = 'Waning Gibbous'
        }
        if(this.daysIntoCycle == 15)
        {
            this.phaseName = 'Full Moon'
        }
        if(15 < this.daysIntoCycle < 22)
        {
            this.phaseName = 'Waxing Gibbous'
        }
        if(this.daysIntoCycle == 22)
        {
            this.phaseName = 'First Quarter'
        }
        if(this.daysIntoCycle > 22)
        {
            this.phaseName = 'Waxing Crescent'
        }
    }
}
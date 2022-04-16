import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter 
{
    constructor()
    {
        super()

        // Timestamp when the experience starts that will remain the same
        this.start = Date.now()
        // Current timestamp that will change on each frame
        this.current = this.start
        // How much time passed since the beginning of the experience
        this.elapsed = 0
        // Time since the previous frame
        this.delta = 16 // 16 refers to the delta between frames in milliseconds in 60fps monitors

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()  
    {
        const currentTime = Date.now()
        this.delta = currentTime - this.current  
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')
 
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}
import EventEmitter from "./EventEmitter.js"
import Experience from '../Experience.js'

export default class Sizes extends EventEmitter
{
    constructor() 
    {
        super()

        // Setup 
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.experience = new Experience()
        this.canvas = this.experience.canvas

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })

        // Fullscreen
        window.addEventListener('keydown', (event) => {
            if (event.key == 'f') 
            {
                this.toggleFullscreen()
            }
        })
    }

    toggleFullscreen()
    {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

        if (!fullscreenElement) {
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen()
            }
            else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen()
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
        }
    }
}
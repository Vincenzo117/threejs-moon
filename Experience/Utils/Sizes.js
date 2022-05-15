import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'

export default class Sizes extends EventEmitter {
  constructor() {
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
    document
      .querySelector('.fullscreen-button')
      .addEventListener('click', (event) => {
        this.toggleFullscreen()
      })
  }

  toggleFullscreen() {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen()
      } else if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
}

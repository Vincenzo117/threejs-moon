import Experience from '../Experience.js'
import MoonData from './Data/MoonData.js'
import DateText from './DateText.js'
import Environment from './Environment.js'
import Moon from './Moon.js'
import NextDayButton from './NextDayButton.js'
import PhaseText from './PhaseText.js'
import PrevDayButton from './PrevDayButton.js'
import Stars from './Stars.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.moonData = new MoonData()

    // Wait for resources loading
    this.resources.on('ready', () => {
      this.moon = new Moon()
      this.phaseText = new PhaseText()
      this.dateText = new DateText()
      this.nextDayButton = new NextDayButton()
      this.prevDayButton = new PrevDayButton()
      this.stars = new Stars()
      this.environment = new Environment()

      // New Date event
      this.moonData.on('newDate', () => {
        this.updateData()
      })

      // Previous Day event
      this.prevDayButton.on('prevDay', () => {
        this.prevDay()
      })

      // Next Day event
      this.nextDayButton.on('nextDay', () => {
        this.nextDay()
      })
    })
  }

  updateData() {
    this.phaseText.updateData()
    this.environment.updateData()
    this.dateText.updateData()
  }

  resize() {
    this.phaseText.resize()
    this.dateText.resize()
    this.moon.resize()
    this.prevDayButton.resize()
    this.nextDayButton.resize()
  }

  nextDay() {
    this.moonData.nextDay()
    this.updateData()
  }

  prevDay() {
    this.moonData.prevDay()
    this.updateData()
  }
}

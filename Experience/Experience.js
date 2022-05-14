import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import Stats from './Utils/Stats.js'
import sources from './sources.js'

let instance = null

export default class Experience 
{
    constructor(canvas)
    {
        // Singletone class
        if (instance)
        {
            return instance
        }
        instance = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.stats = new Stats()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resources = new Resources(sources)
        this.renderer = new Renderer()  
        this.world = new World()

        // Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.world.resize()
    }

    update()
    {
        if(this.stats.active)
            this.  stats.instance.begin()

        this.camera.update()
        this.renderer.update()

        if(this.stats.active)
            this.stats.instance.end()
    }
}
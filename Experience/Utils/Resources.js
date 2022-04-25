import * as THREE from 'three'
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sources = sources
        this.items = {}

        this.setOverlay()
        this.setLoaders()
        this.startLoading()
    }

    setOverlay()
    {
        this.overlayGeometry = new THREE.PlaneBufferGeometry(100, 100)
        this.overlayMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 , transparent: true })
        this.overlayMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.overlayMesh.position.z = this.camera.instance.position.z - 0.4
        this.scene.add(this.overlayMesh)
    }

    setLoaders()
    {   
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.loadingManager = new THREE.LoadingManager( 
            () =>
            {
                this.trigger('ready')

                gsap.to(this.overlayMaterial, {duration: 3, opacity: 0, delay: 1})

                gsap.delayedCall(1, () =>
                {
                    this.loadingBarElement.classList.add('ended')
                    this.loadingBarElement.style.transform = ''
                })
            },
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                // On progress
                this.loadingBarElement.style.transform = `scaleX(${itemsLoaded / itemsTotal})`
            },
            (error) =>
            {
                console.log(error);
            }
        )

        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.fontLoader = new FontLoader(this.loadingManager)
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            // Test type
            if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }

            if(source.type === 'font')
            {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
    }
}
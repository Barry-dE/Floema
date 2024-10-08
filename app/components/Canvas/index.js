import { Camera, Renderer, Transform } from 'ogl'

import Home from './Home'
export default class Canvas {
    constructor() {
        this.x = {
            start: 0,
            distance: 0,
            end: 0,
        }
        this.y = {
            start: 0,
            distance: 0,
            end: 0,
        }
        this.createRenderer()
        this.createCamera()
        this.createScene()
        this.onResize()
        this.createHome()
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
        })
        this.gl = this.renderer.gl
        document.body.appendChild(this.gl.canvas)
    }

    createScene() {
        this.scene = new Transform()
    }

    createHome() {
        this.home = new Home({
            gl: this.gl,
            scene: this.scene,
        })
    }

    createCamera() {
        this.camera = new Camera()
        this.camera.position.z = 5
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera.perspective({
            aspect: window.innerWidth / window.innerHeight,
        })

        const fov = this.camera.fov * (Math.PI / 180)
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z
        const width = height * this.camera.aspect
        this.sizes = {
            height,
            width,
        }

        if (this.home) {
            this.home.onResize({
                sizes: this.sizes,
            })
        }
    }

    onTouchDown(event) {
        if (!event) return
        this.isDown = true

        this.x.start = event.touches ? event.touches[0].clientX : event.clientX
        this.y.start = event.touches ? event.touches[0].clientY : event.clientY

        if (this.home) {
            this.home.onTouchDown({
                x: this.x,
                y: this.y,
            })
        }
        // console.log('down', this.x, this.y)
    }

    onTouchMove(event) {
        if (!this.isDown) return

        const x = event.touches ? event.touches[0].clientX : event.clientX
        const y = event.touches ? event.touches[0].clientY : event.clientY

        this.x.end = x
        this.y.end = y

        if (this.home) {
            this.home.onTouchMove({
                x: this.x,
                y: this.y,
            })
        }
    }

    onTouchUp(event) {
        this.isDown = false

        const x = event.touches ? event.touches[0].clientX : event.clientX
        const y = event.touches ? event.touches[0].clientY : event.clientY

        this.x.end = x
        this.y.end = y

        if (this.home) {
            this.home.onTouchUp({
                x: this.x,
                y: this.y,
            })
        }
    }

    onWheel({ event }) {
        if (this.home) {
            this.home.onWheel(event)
        }
    }

    update() {
        if (this.home) {
            this.home.update()
        }

        this.renderer.render({
            camera: this.camera,
            scene: this.scene,
        })
    }
}

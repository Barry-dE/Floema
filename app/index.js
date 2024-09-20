import Home from './pages/Home'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import About from './pages/About'
import { each } from 'lodash'
import Preloader from './components/preloader'
import Navigation from './components/navigation'
import Canvas from './components/Canvas'
import normalizeWheel from 'normalize-wheel'

class App {
    constructor() {
        this.createContent()
        this.createPreloader()
        this.createPages()
        this.createNavigation()
        this.createCanvas()
        this.addLinkListeners()
        this.addEventListeners()

        this.update()
        this.navigation.onChange({ template: this.template })
    }

    // Routing
    createPages() {
        this.pages = {
            home: new Home(),
            about: new About(),
            detail: new Detail(),
            collections: new Collections(),
        }

        // current page
        this.page = this.pages[this.template]
        this.page.create()
    }

    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    async onUrlChange(url) {
        try {
            await this.page.hide()
            const request = await window.fetch(url)

            if (request.status === 200) {
                const html = await request.text()
                const div = document.createElement('div')
                div.innerHTML = html
                const divContent = div.querySelector('.content')
                this.template = divContent.getAttribute('data-template')
                this.content.setAttribute('data-template', this.template)
                this.content.innerHTML = divContent.innerHTML
                this.page = this.pages[this.template]
                this.page.create()
                this.page.show()
                this.navigation.onChange({ template: this.template })
                this.onResize()

                this.addLinkListeners()
            }
        } catch (error) {
            console.log(error)
        }
    }

    createNavigation() {
        this.navigation = new Navigation()
    }

    onResize() {
        if (this.page && this.page.onResize) {
            this.page.onResize()
        }

        if (this.canvas && this.canvas.onResize) {
            this.canvas.onResize()
        }
    }

    addLinkListeners() {
        const links = document.querySelectorAll('a')

        each(links, (link) => {
            link.onclick = (e) => {
                e.preventDefault()
                const { href } = link
                this.onUrlChange(href)
            }
        })
    }

    // preloader
    createPreloader() {
        this.preloader = new Preloader()
        this.preloader.once('completed', this.onPreloaded.bind(this))
    }

    onPreloaded() {
        this.preloader.destroy()
        this.onResize()
        this.page.show()
    }

    //smooth scroll
    update() {
        if (this.page && this.page.update) {
            this.page.update()
        }

        if (this.canvas && this.canvas.update) {
            this.canvas.update()
        }

        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    onTouchDown(event) {
        if (this.canvas && this.canvas.onTouchDown) {
            this.canvas.onTouchDown(event)
        }
    }

    onTouchMove(event) {
        if (this.canvas && this.canvas.onTouchMove) {
            this.canvas.onTouchMove(event)
        }
    }

    onTouchUp(event) {
        if (this.canvas && this.canvas.onTouchUp) {
            this.canvas.onTouchUp(event)
        }
    }

    onWheel(event) {
        const normalizedWheel = normalizeWheel(event)

        if (this.page && this.page.onWheel) {
            this.page.onWheel(normalizedWheel)
        }

        if (this.canvas && this.canvas.onWheel) {
            this.canvas.onWheel(normalizedWheel)
        }
    }

    addEventListeners() {
        window.addEventListener('mousewheel', this.onWheel.bind(this))

        window.addEventListener('mousedown', this.onTouchDown.bind(this))
        window.addEventListener('mousemove', this.onTouchMove.bind(this))
        window.addEventListener('mouseup', this.onTouchUp.bind(this))

        window.addEventListener('touchstart', this.onTouchDown.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        window.addEventListener('touchend', this.onTouchUp.bind(this))

        window.addEventListener('resize', this.onResize.bind(this))
    }

    //Ogl
    createCanvas() {
        this.canvas = new Canvas()
    }
}

new App()

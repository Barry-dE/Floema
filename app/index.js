import Home from './pages/Home'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import About from './pages/About'
import { each } from 'lodash'
import Preloader from './components/preloader'

class App {
    constructor() {
        this.createPreloader()
        this.createContent()
        this.createPages()
        this.addLinkListeners()

        this.update() //smooth scroll
        this.addEventListeners()
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
                this.onResize()

                this.addLinkListeners()
            }
        } catch (error) {
            console.log(error)
        }
    }

    onResize() {
        //call onresize for the current page if it has it
        if (this.page && this.page.onResize) {
            this.page.onResize()
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

        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this))
    }
}

new App()

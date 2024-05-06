import About from './pages/About'
import Detail from './pages/Detail'
import Collections from './pages/Collections'
import Home from './pages/Home'
import { each } from 'lodash'
import Preloader from './components/preloader'
class App {
    constructor() {
        this.createPreloader() //initialize the preloader class
        this.createContent()
        this.createPages()
        this.addLinkListeners()
        this.update() //gets called over and over in each animation frame of the browser (requestAnimationFrame)
        this.addEventListeners() //calls the onResize method
    }

    // 1. Create the pages
    createPages() {
        this.pages = {
            about: new About(),
            collection: new Collections(),
            detail: new Detail(),
            home: new Home(),
        }

        // 3. set the current page
        this.page = this.pages[this.template]
        this.page.create()
    }

    // 7. create preloader and listen for image loading completion
    createPreloader() {
        this.preloader = new Preloader()
        this.preloader.once('completed', this.onPreloaded.bind(this))
    }

    // 2. initialize about and home page when you are in the about page and homepage
    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    //6. destroy the current preloader after the assest loading have been completed
    onPreloaded() {
        this.preloader.destroy() // destroy preloader
        this.onResize()
        this.page.show() //show page
    }

    // 8. requestAnimationframe (smooth scroll)
    update() {
        if (this.page && this.page.update) {
            this.page.update()
        }

        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    // limit page smooth scroll to the height of the wrapper
    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this))
    }

    //  4. select all the links on the website and listen for click event
    addLinkListeners() {
        const links = document.querySelectorAll('a')
        each(links, (link) => {
            link.onclick = (event) => {
                event.preventDefault()
                const { href } = link

                // get the clicked link to load the clicked page
                this.onChange(href)
            }
        })
    }

    //5.  fetch and render the clicked page without refreshing the browser
    async onChange(url) {
        // hide the current page
        await this.page.hide()

        // fetch the clicked page
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
            this.onResize()
            this.page.create()
            this.page.show()
            this.addLinkListeners()
        } else {
            console.log('Error')
        }
    }

    //resize current page if it has the onResize method
    onResize() {
        if (this.page && this.page.onResize) {
            this.page.onResize()
        }
    }
}

new App()

import { each } from 'lodash'
import About from './pages/About'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import Home from './pages/Home'
import Preloader from './components/preloader'
import Navigation from './components/navigation'

class App {
    constructor() {
        this.createContent()
        this.createPreloader() //creates the preloader component
        this.createPages()
        this.addLinkListeners()
        this.createNavigation()

        // this.update() //related to smooth scroll
    }

    // 2) (preloader) create preloader instance
    createPreloader() {
        this.preloader = new Preloader()
        // 3 listen to preloader complete event
        this.preloader.once('completed', this.onPreloaded.bind(this))
    }

    //1) navigation
    createNavigation() {
        this.navigation = new Navigation({
            template: this.template,
        })
        //call the nav onchange in the app class on change
    }

    // 1. create pages
    createPages() {
        //structure that holds all the pages
        this.pages = {
            about: new About(),
            collections: new Collections(),
            detail: new Detail(),
            home: new Home(),
        }

        //initialize current page
        this.page = this.pages[this.template]
        this.page.create()
    }

    //2 create the content of each page user tries to access
    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    // 7) listen for url change and fetch the clicked page and content.
    async onChange(url) {
        console.log('navigating to', url)
        this.page.hide() //hide current page before fetching the requested page
        const request = await window.fetch(url)

        if (request.status === 200) {
            console.log('page fetched successfully')
            const html = await request.text()
            const div = document.createElement('div')
            div.innerHTML = html
            const divContent = div.querySelector('.content')
            this.template = divContent.getAttribute['data-template']
            this.content.setAttribute('data-template', this.template)
            this.content.innerHTML = divContent.innerHTML
            console.log('url updated to,', url)
            // this.navigation.onChange(this.template)
            this.page.create()
            this.page.show()
        } else {
            console.log('Error')
        }
    }

    //4) preloader -- what should happen when everything has been preloaded
    onPreloaded() {
        this.preloader.destroy()
        this.page.show()
    }

    //4) smooth scroll
    update() {
        if (this.page && this.page.update) {
            // this.page.update()
        }
        // this.frame = window.requestAnimationFrame(this.update(this))
    }
    /**
     * Adds event listeners to links for the purpose of navigation.
     * Listens for click events on links to navigate to different pages
     * 6)
     */
    addLinkListeners() {
        const links = document.querySelectorAll('a')
        each(links, (link) => {
            link.onclick = (e) => {
                e.preventDefault()
                const { href } = link
                this.onChange(href)
            }
        })
    }
}

new App()

import { each } from 'lodash'
import About from './pages/About'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import Home from './pages/Home'

class App {
    constructor() {
        this.createContent()
        this.createPages()
        this.addLinkListeners()
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
        this.page.show()
    }

    //2 create the content of each page user tries to access
    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    // 7) listen for url change and fetch the clicked page and content.
    async onChange(url) {
        this.page.hide() //hide current page before fetching the requested page
        const request = await window.fetch(url)

        if (request.status === 200) {
            const html = await request.text()
            const div = document.createElement('div')
            div.innerHTML = html
            console.log(div)
            const divContent = div.querySelector('.content')
            this.template = divContent.getAttribute['data-template']
            this.content.setAttribute('data-template', this.template)
            this.content.innerHTML = divContent.innerHTML

            this.page.create()
            this.page.show()
        } else {
            console.log('Error')
        }
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

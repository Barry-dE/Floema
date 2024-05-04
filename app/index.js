import About from './pages/About'
import Detail from './pages/Detail'
import Collections from './pages/Collections'
import Home from './pages/Home'
import { each } from 'lodash'
class App {
    constructor() {
        this.createContent()
        this.createPages()
        this.addLinkListeners()
    }

    // 1. Create the pages
    createPages() {
        this.pages = {
            about: new About(),
            collection: new Collections(),
            detail: new Detail(),
            home: new Home(),
        }

        // set the current page
        this.page = this.pages[this.template]
        this.page.create()
        this.page.show()
    }

    // 2. initialize about and home page when you are in the about page and homepage
    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
    }

    // select all the links on the website and listen for click event
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

    // fetch and render the clicked page without refreshing the browser
    async onChange(url) {
        const request = await window.fetch(url)

        if (request.status === 200) {
            const html = await request.text()
            const div = document.createElement('div')
            div.innerHTML = html

            const divContent = div.querySelector('.content')

            this.content.innerHTML = divContent.innerHTML
        } else {
            console.log('Error')
        }
    }
}

new App()

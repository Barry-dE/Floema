import About from './pages/About'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import Home from './pages/Home'

class App {
    constructor() {
        this.createContent()
        this.createPages()
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
}

new App()

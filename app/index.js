import About from 'pages/About'
import Home from 'pages/Home'
import Detail from 'pages/Detail'
import Collections from 'pages/Collections'

class App {
  constructor() {
    this.createPages()
    this.createContent()
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
    console.log(this.template)
    console.log(this)
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    // console.log(this.template)
  }
}

new App()

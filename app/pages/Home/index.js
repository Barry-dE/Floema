import Page from '../../classes/Pages'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        link: '.home_link',
      },
    })
  }

  create() {
    super.create()
    this.elements.link.addEventListener('click', () =>
      console.log('You clicked me'),
    )
  }
}

import Page from '../../classes/Pages'

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '.about',
      elements: {
        wrapper: '.about_wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.about_title',
      },
    })
  }
}

import Component from './Component'

export class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader_text',
        number: '.preloader_number',
      },
    })
    console.log(this.element, this.elements)
  }
}

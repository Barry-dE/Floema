import Component from '../components/Component'

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    })
    this.element = element

    this.createObserver()
    this.animateOut()
  }

  createObserver() {
    this.observer = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('animateIn')
          this.animateIn()
        } else {
          console.log('animateOut')
          this.animateOut()
        }
      })

      this.observer.observe(this.element)
    })
  }

  animateIn() {}

  animateOut() {}
}

import gsap from 'gsap'

import Animation from '../classes/animation'
import { calculate, split } from 'utils/text'
export default class Title extends Animation {
  constructor(element, elements) {
    super({
      element,
      elements,
    })

    split({
      element: this.element,
    })

    split({
      element: this.element,
    })

    // this.elementLines = this.element.querySelector('span span')
  }

  animateIn() {
    gsap.fromTo(
      this.element,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        delay: 0.5,
        duration: 1.5,
      },
    )
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    })
  }
}

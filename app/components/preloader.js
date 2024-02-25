import Component from './Component'
import each from 'lodash/each'
import gsap from 'gsap'
import { split } from '../utils/text'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader_text',
        number: '.preloader_number',
        images: document.querySelectorAll('img'),
        numberText: 'preloader_number_text',
      },
    })

    split({
      element: this.elements.title,
      expression: '<br>',
    })

    split({
      element: this.elements.title,
      expression: '<br>',
    })

    this.elements.titleSpans = this.elements.title.querySelectorAll('span span')
    this.elements.numberText = this.elements.number.querySelector(
      '.preloader_number_text',
    )
    console.log(this.elements)
    this.length = 0

    this.createLoader()
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = (_) => this.onAssetsLoaded(element)
      element.src = element.getAttribute('data-src')
    })
  }

  onAssetsLoaded(image) {
    this.length += 1
    const percent = this.length / this.elements.images.length
    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = gsap.timeline({
        delay: 2,
      })

      this.animateOut.to(this.elements.titleSpans, {
        stagger: 0.1,
        duration: 1.5,
        ease: 'expo.out',
        y: '110%',
      })

      this.animateOut.to(
        this.elements.numberText,
        {
          stagger: 0.1,
          duration: 1.5,
          ease: 'expo.out',
          y: '110%',
        },
        '-=1',
      )

      this.animateOut.to(this.element, {
        scaleY: 0,
        transformOrigin: '100% 100%',
        ease: 'expo.out',
      })

      this.animateOut.call((_) => {
        this.emit('completed')
      })
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}

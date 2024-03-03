import each from 'lodash/each'
import gsap from 'gsap'
import Prefix from 'prefix'

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element
    this.childSelector = { ...elements }
    this.id = id

    this.transformPrefix = Prefix('transform')
  }

  create() {
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
    }
    this.element = document.querySelector(this.selector)
    this.elements = {}
    each(this.childSelector, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  show() {
    return new Promise((resolve) => {
      this.animationIn = gsap.timeline()
      this.animationIn.fromTo(
        this.element,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
        },
      )
      this.animationIn.call((_) => {
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners()
      this.animationIn = gsap.timeline()
      this.animateOut = gsap.timeline()

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  onMouseWheel(event) {
    console.log(event)
    const { deltaY } = event
    this.scroll.target += deltaY
  }

  update() {
    console.log(this.scroll.target)
    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1,
    )

    this.elements.wrapper.style[this.transformPrefix] =
      `translateY(-${this.scroll.current}px)`
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheel)
  }

  removeEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheel)
  }
}

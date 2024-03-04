import each from 'lodash/each'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super()
    this.selector = element
    console.log(this.selector)
    this.childSelector = { ...elements }

    this.create()
    this.addEventListeners()
  }

  create() {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector
    } else if (typeof this.selector === 'object') {
      this.element = document.querySelector(
        '.' + this.selector.element.className,
      )
    } else {
      this.element = document.querySelector(this.selector)
    }
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

  addEventListeners() {}

  removeEventListeners() {}
}

import each from 'lodash/each'

export default class Component {
  constructor({ element, elements }) {
    this.selector = element
    this.childSelector = { ...elements }

    this.create()
    this.addEventListeners()
  }

  create() {
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
      console.log(this.elements[key], entry)
    })
  }

  addEventListeners() {}

  removeEventListeners() {}
}

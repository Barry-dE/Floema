import EventEmitter from 'events'

export default class Component extends EventEmitter {
    constructor({ element, elements }) {
        super()
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }

        this.create()
        this.addEventListeners()
    }

    // initialize current page class
    create() {
        // this.element = document.querySelector(this.selector)
        this.elements = {}

        if (this.selector instanceof HTMLElement) {
            this.element = this.selector
        } else {
            this.element = document.querySelector(this.selector)
        }

        // this.elements = {}

        Object.keys(this.selectorChildren).forEach((key) => {
            const entry = this.selectorChildren[key]

            if (
                entry instanceof HTMLElement ||
                entry instanceof NodeList ||
                Array.isArray(entry)
            ) {
                this.elements[key] = entry
            } else {
                this.elements[key] = this.element.querySelectorAll(entry)

                if (this.elements[key].length === 0) {
                    this.elements[key] = null
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = this.element.querySelector(entry)
                }
            }
        })
    }

    addEventListeners() {}

    removeEventListeners() {}
}

import { each } from 'lodash'
export default class Page {
    constructor({ element, elements, id }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }
    }

    // 3) create page of the clicked link (call create in app)
    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        each(this.selectorChildren, (entry, key) => {
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
                    this.elements[key] = document.querySelectorAll(entry)
                }
            }
        })
    }
}

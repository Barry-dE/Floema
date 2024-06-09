import { each } from 'lodash'
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

    // Initialize the page by querying the main element and its children
    create() {
        // Query the main element using the selector
        if (this.selector instanceof HTMLElement) {
            this.element = this.selector
        } else {
            this.element = document.querySelector(this.selector)
        }
        this.elements = {}

        // Iterate through each selector child entry
        each(this.selectorChildren, (entry, key) => {
            if (
                entry instanceof window.HTMLElement ||
                entry instanceof window.NodeList ||
                Array.isArray(entry)
            ) {
                // Directly assign if the entry is an HTMLElement, NodeList, or Array
                this.elements[key] = entry
            } else {
                // Query the DOM for the entry selector
                this.elements[key] = document.querySelectorAll(entry)
                if (this.elements[key].length === 0) {
                    // If no elements are found, set to null
                    this.elements[key] = null
                } else if (this.elements[key].length === 1) {
                    // If only one element is found, keep it as a NodeList

                    this.elements[key] = document.querySelectorAll(entry)
                }
            }
        })
    }

    addEventListeners() {}

    removeEventListeners() {}
}

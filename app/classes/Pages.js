import gsap from 'gsap'
import { each } from 'lodash'
import { resolve } from 'path-browserify'
export default class Page {
    constructor({ element, elements, id }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }
    }

    // 3) Initialize the page by querying the main element and its children
    create() {
        // Query the main element using the selector
        this.element = document.querySelector(this.selector)
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

    // 4. show page ()
    show() {
        return new Promise((resolve) => {
            gsap.from(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    // 5) hide page (call in onChange)
    hide() {
        return new Promise((resolve) => {
            gsap.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }
}

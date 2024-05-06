import gsap from 'gsap'
import { each } from 'lodash'
import EventEmitter from 'events'
export default class Component extends EventEmitter {
    constructor({ element, elements }) {
        // The EventEmitter class enables inter-object communication, allowing one object to notify others of changes or updates.
        // In this scenario, the preloader class listens for an event indicating that all images on the page have loaded,
        // allowing it to hide the preloader once the images are ready.
        super()
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }

        this.create()
        this.addEventListeners()
    }

    create() {
        //this.element is the entire home element, while this.selector is the css .home selector
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
                    this.elements[key] = document.querySelector(entry)
                }
            }
        })
    }

    // show page
    addEventListeners() {}

    // hide page
    removeEventListeners() {}
}

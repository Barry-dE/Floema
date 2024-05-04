import gsap from 'gsap'
import { each } from 'lodash'
export default class Page {
    constructor({ id, element, elements }) {
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }
        this.id = id
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

                console.log(this.elements[key], entry)
            }
        })
    }

    // show page
    show() {
        gsap.from(this.element, {
            autoAlpha: 0,
            delay: 4,
        })
    }

    // hide page
    hide() {
        gsap.to(this.element, { autoAlpha: 0 })
    }
}

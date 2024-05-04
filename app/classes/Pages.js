import gsap from 'gsap'
import { each } from 'lodash'
import { resolve } from 'path-browserify'
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
        return Promise((resolve) => {
            gsap.from(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    // hide page
    hide() {
        return Promise((resolve) => {
            gsap.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }
}

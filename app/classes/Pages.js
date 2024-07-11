import gsap from 'gsap'
import { each } from 'lodash'
import { resolve } from 'path-browserify'

export default class Pages {
    constructor({ id, element, elements }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }
    }

    // initialize current page class
    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        if (this.selector instanceof HTMLElement) {
            this.element = this.selector
        } else {
            this.element = document.querySelector(this.selector)
        }

        this.elements = {}
        console.log(this.selectorChildren, this.elements)

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

    show() {
        return new Promise((resolve) => {
            gsap.fromTo(
                this.element,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    onComplete: resolve,
                },
            )
        })
    }

    hide() {
        return new Promise((resolve) => {
            gsap.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }
}

import gsap from 'gsap'
import { each } from 'lodash'
import Prefix from 'prefix'

export default class Page {
    constructor({ element, elements, id }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }
        this.transformPrefix = Prefix('transform')
        console.log(this.transformPrefix)
        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
        } //6 smooth scroll
    }

    // 3) Initialize the page by querying the main element and its children
    create() {
        // Query the main element using the selector
        this.element = document.querySelector(this.selector)
        this.elements = {}

        this.scroll = {
            //reset in create
            current: 0,
            target: 0,
            last: 0,
        } //6 smooth scroll

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
            this.animateIn = gsap.timeline()

            this.animateIn.fromTo(
                this.element,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                },
            )

            this.animateIn.call(() => {
                this.addEventListeners() //add event listeners after the animation is complete

                resolve()
            })
        })
    }

    // 5) hide page (call in onChange)
    hide() {
        return new Promise((resolve) => {
            this.animateOut = gsap.timeline()

            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    //3 smooth scroll
    onMouseWheel(event) {
        const { deltaY } = event
        console.log(deltaY)

        this.scroll.target += deltaY
    }

    //5 smooth scroll
    update() {
        this.scroll.current = gsap.utils.interpolate(
            this.scroll.current,
            this.scroll.target,
            0.1,
        )

        this.elements.wrapper.styles(this.transformPrefix) = `translateY(-${this.scroll.current} px)`
    }

    // 1) smooth scroll
    addEventListeners() {
        window.addEventListener('mousewheel', this.onMouseWheel)
    }

    //2 smooth scroll
    removeEventListeners() {
        window.removeEventListener('mousewheel', this.onMouseWheel)
    }
}

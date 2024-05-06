import gsap from 'gsap'
import { each } from 'lodash'
import Prefix from 'prefix'

export default class Page {
    constructor({ id, element, elements }) {
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }

        this.id = id

        this.transformPrefix = Prefix('transform')
        // this.scroll = {
        //     currentScrollPosition: 0,
        //     targetScrollPosition: 0,
        //     lastScrollPosition: 0,
        //     limitScrollPosition: 0,
        // }

        //set the this keyword to point to the Page class
        this.onMouseWheelEvent = this.onMouseWheel.bind(this)
    }

    create() {
        //this.element is the entire home element, while this.selector is the css .home selector
        this.element = document.querySelector(this.selector)
        this.elements = {}

        this.scroll = {
            currentScrollPosition: 0,
            targetScrollPosition: 0,
            lastScrollPosition: 0,
            limitScrollPosition: 0,
        }

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
    show() {
        return new Promise((resolve) => {
            this.animationIn = gsap.timeline()

            //animate page in
            this.animationIn.fromTo(
                this.element,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    onComplete: resolve,
                },
            )

            //listen for scroll events as soon as the page is loaded and shown
            this.animationIn.call(() => {
                this.addEventListeners()

                resolve()
            })
        })
    }

    // hide page
    hide() {
        return new Promise((resolve) => {
            //remove smooth scroll before the page is hidden
            this.removeEventListeners()

            //animate page out
            this.animateOut = gsap.timeline()
            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    //smooth scrolling
    onMouseWheel(event) {
        const { deltaY } = event
        this.scroll.targetScrollPosition += deltaY
    }

    // update the animatinframe
    update() {
        this.scroll.currentScrollPosition = gsap.utils.interpolate(
            this.scroll.currentScrollPosition,
            this.scroll.targetScrollPosition,
            0.1,
        )

        //clamp the scroll so that it does not exceed the length of the wrapper div and scroll till infinity
        this.scroll.targetScrollPosition = gsap.utils.clamp(
            0,
            this.scroll.limitScrollPosition,
            this,
            this.scroll.currentScrollPosition,
            // current should not be higher than the limit or less that zero
        )

        if (this.scroll.targetScrollPosition < 0.01) {
            this.scroll.targetScrollPosition = 0
        }

        // check if the page has a wrapper element
        if (this.elements.wrapper) {
            this.elements.wrapper.style[this.transformPrefix] =
                `translateY(-${this.scroll.currentScrollPosition}px)`
        }
    }

    //update scroll limit based on the resize of the browser
    onResize() {
        if (this.elements.wrapper) {
            this.scroll.limitScrollPosition =
                this.elements.wrapper.clientHeight - window.innerHeight
            console.log(this.elements)
        }
    }
    //listen for scroll event
    addEventListeners() {
        window.addEventListener('mousewheel', this.onMouseWheelEvent)
    }

    //stop listening for scroll event
    removeEventListeners() {
        window.removeEventListener('mousewheel', this.onMouseWheelEvent)
    }
}

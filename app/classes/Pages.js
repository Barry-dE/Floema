import gsap from 'gsap'
import Prefix from 'prefix'

export default class Pages {
    constructor({ id, element, elements }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
        }

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        }

        this.transformPrefix = Prefix('transform')
        console.log(this.transformPrefix)

        this.onMouseWheelEvent = this.onMouseWheel.bind(this)
    }

    // initialize current page class
    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}
        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        }

        if (this.selector instanceof HTMLElement) {
            this.element = this.selector
        } else {
            this.element = document.querySelector(this.selector)
        }

        this.elements = {}

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
            this.animationIn = gsap.timeline()
            this.animationIn.fromTo(
                this.element,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                },
            )

            this.animationIn.call(() => {
                this.addEventListeners()

                resolve()
            })
        })
    }

    hide() {
        return new Promise((resolve) => {
            this.removeEventListeners()
            this.animateOut = gsap.timeline()
            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    // smooth scroll
    onMouseWheel(e) {
        const { deltaY } = e
        this.scroll.target += deltaY
    }

    onResize() {
        if (this.elements.wrapper) {
            this.scroll.limit =
                this.elements.wrapper.clientHeight - window.innerHeight
        }
    }

    update() {
        this.scroll.current = gsap.utils.interpolate(
            this.scroll.current,
            this.scroll.target,
            0.1,
        )

        this.scroll.target = gsap.utils.clamp(
            0,
            this.scroll.limit,
            this.scroll.target,
        )

        if (this.elements.wrapper) {
            this.elements.wrapper.style[this.transformPrefix] =
                `translateY(-${this.scroll.current}px)`
        }

        if (this.scroll.current < 0.01) {
            this.scroll.current = 0
        }
    }

    addEventListeners() {
        window.addEventListener('mousewheel', this.onMouseWheelEvent)
    }

    removeEventListeners() {
        window.removeEventListener('mousewheel', this.onMouseWheelEvent)
    }
}

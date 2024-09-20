import gsap from 'gsap'
import Prefix from 'prefix'
import { each, map } from 'lodash'
import Title from '../animations/Title'
import { colorsManager } from './Colors'
import AsyncLoad from './AsyncLoad'
// import Paragraph from '../animations/Paragrapgh'
// import Highlights from '../animations/Highlight'

export default class Pages {
    constructor({ id, element, elements }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
            animationsTitles: '[data-animation="title"]',
            animationsParagraphs: '[data-animation="paragraph"]',
            animationsLabels: '[data-animation="label"]',
            animationsHighlights: '[data-animation="highlight"]',
            imagePreloaders: '[data-src]',
        }

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        }

        this.transformPrefix = Prefix('transform')
    }

    // initialize current page class
    create() {
        // this.element = document.querySelector(this.selector)
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

        this.createAnimations()
        this.createImagePreloader()
    }

    // Async load images as they enter the viewport
    createImagePreloader() {
        this.preloaders = map(this.elements.imagePreloaders, (element) => {
            return new AsyncLoad({ element: element })
        })
    }

    // text animations
    createAnimations() {
        this.animations = [] //simplify on resize

        this.animationsTitles = map(
            this.elements.animationsTitles,
            (element) => {
                return new Title({ element })
            },
        )

        this.animations.push(...this.animationsTitles)

        // //paragraph
        // this.animationsParagraphs = map(
        //     this.elements.animationsParagraphs,
        //     (element) => {
        //         return new Paragraph({ element })
        //     },
        // )

        // this.animations.push(...this.animationsParagraphs)

        // Labels
        // this.animationsLabels = map(
        //     this.elements.animationsLabels,
        //     (element) => {
        //         return new Paragraph({ element })
        //     },
        // )

        // this.animations.push(...this.animationsLabels)

        // // Highlights
        // this.animationsHighlights = map(
        //     this.elements.animationsHighlights,
        //     (element) => {
        //         return new Highlights({ element })
        //     },
        // )

        // this.animations.push(...this.animationsHighlights)
    }

    ////////////////

    show() {
        return new Promise((resolve) => {
            colorsManager.change({
                backgroundColor: this.element.getAttribute('data-background'),
                color: this.element.getAttribute('data-color'),
            })

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
            this.destroy()
            this.animateOut = gsap.timeline()
            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    onResize() {
        if (this.elements.wrapper) {
            this.scroll.limit =
                this.elements.wrapper.clientHeight - window.innerHeight
        }

        each(this.animations, (animation) => {
            animation.onResize()
        })
    }

    // smooth scroll
    onWheel(pixelY) {
        this.scroll.target += pixelY
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
        // window.addEventListener('mousewheel', this.onMouseWheelEvent)
    }

    removeEventListeners() {
        // window.removeEventListener('mousewheel', this.onMouseWheelEvent)
    }

    //Destroy
    destroy() {
        this.removeEventListeners()
    }
}

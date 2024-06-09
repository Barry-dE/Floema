import gsap from 'gsap'
import { each, map } from 'lodash'
import Prefix from 'prefix'
import Titles from '../animations/Title'
import Paragraph from '../animations/Paragrapgh'
import Labels from '../animations/Label'
import Highlights from '../animations/Highlight'
import { ColorsManager } from './Colors'
import AsyncLoad from './AsyncLoad'

export default class Page {
    constructor({ element, elements, id }) {
        this.id = id
        this.selector = element
        this.selectorChildren = {
            ...elements,
            animationsHighlights: '[data-animation="highlight"]',
            animationsTitles: '[data-animation="title"]', //title element
            animationsParagraphs: '[data-animation="paragraph"]',
            animationsLabels: '[data-animation="label"]',
            preloaders: '[data-src]',
        }

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
        } //6 smooth scroll

        this.onResize()
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

        this.createAnimations() //create titles animation as soon as the DOM is ready
        this.createPreloader() //preload the images as the page is created(initialize the AsyncLoad class)
    }

    //2) Text animations
    createAnimations() {
        this.animations = []

        //highlights
        this.animateHighlights = map(
            this.elements.animationsHighlights,
            (element) => {
                return new Highlights({ element })
            },
        )

        this.animations.push(...this.animateHighlights)

        //titles
        this.animateTitles = map(this.elements.animationsTitles, (element) => {
            return new Titles({ element })
        })

        this.animations.push(...this.animateTitles)

        // paragraph
        this.animateParagraphs = map(
            this.elements.animationsParagraphs,
            (element) => {
                return new Paragraph({ element })
            },
        )

        this.animations.push(...this.animateParagraphs)

        //labels
        this.animateLabel = map(this.elements.animationsLabels, (element) => {
            return new Labels({ element })
        })

        this.animations.push(...this.animateParagraphs)
    }

    //image preloader
    createPreloader() {
        this.preloaders = map(this.elements.preloaders, (element) => {
            console.log(element)
            return new AsyncLoad({ element })
        })
    }

    // 4. show page ()
    show() {
        return new Promise((resolve) => {
            ColorsManager.change({
                backgroundColor: this.element.getAttribute('data-bg-color'),
                color: this.element.getAttribute('data-color'),
            })
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
                // this.addEventListeners() //add event listeners after the animation is complete

                resolve()
            })
        })
    }

    // 5) hide page (call in onChange)
    hide() {
        this.destroy()
        return new Promise((resolve) => {
            this.animateOut = gsap.timeline()

            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            })
        })
    }

    //3 smooth scroll
    // onMouseWheel(event) {
    //     const { deltaY } = event
    //     console.log(deltaY)

    //     this.scroll.target += deltaY
    // }

    //5 smooth scroll
    // update() {
    //     this.scroll.current = gsap.utils.interpolate(
    //         this.scroll.current,
    //         this.scroll.target,
    //         0.1,
    //     )

    //     if (this.elements.wrapper && this.elements.wrapper[0]) {
    //         this.elements.wrapper[0].styles[this.transformPrefix] =
    //             `translateY(-${this.scroll.current} px)`
    //     }

    //     // console.log('Transform Prefix:', this.transformPrefix)
    // }

    // 1) smooth scroll
    // addEventListeners() {
    //     window.addEventListener('mousewheel', this.onMouseWheel)
    // }

    // //2 smooth scroll
    // removeEventListeners() {
    //     window.removeEventListener('mousewheel', this.onMouseWheel)
    // }

    onResize() {
        each(this.animations, (animation) => animation.onResize())
    }

    destroy() {}
}

import { each } from 'lodash'
import Component from '../classes/Component'
import gsap from 'gsap'
import { split } from '../utils/text'

export default class Preloader extends Component {
    constructor() {
        // 1) Initialize the elements by calling the super function
        super({
            element: '.preloader',
            elements: {
                title: '.preloader__text',
                number: '.preloader__number',
                images: document.querySelectorAll('img'),
                numberText: '.preloader__number__text',
            },
        })

        split({
            element: this.elements.title[0],
        })
        // console.log(this.element, this.elements)
        split({
            element: this.elements.title[0],
        })
        this.elements.titleSpans =
            this.elements.title[0].querySelectorAll('span span')
        this.createLoader()

        // Initialize the count of loaded images to 0
        this.length = 0
    }

    //7) // Trigger the 'completed' event
    onLoaded() {
        return new Promise((resolve) => {
            this.animateOut = gsap.timeline({
                delay: 3,
            })

            this.animateOut.to(this.elements.titleSpans, {
                stagger: 0.1,
                y: '100%',
                duration: 1.5,
                ease: 'expo.out',
            })

            this.animateOut.to(
                this.elements.numberText,
                {
                    stagger: 0.1,
                    y: '100%',
                    duration: 1.5,
                    ease: 'expo.out',
                },
                '-=1.4',
            )
            this.animateOut.to(
                this.element,
                {
                    autoAlpha: 0,
                    scaleY: 0,
                    transformOrigin: '0 0',
                    duration: 1.5,
                    ease: 'expo.out',
                },
                '-=1',
            )

            this.animateOut.call(() => {
                this.emit('completed')
            })
        })
    }

    // 6) preloader --- Handler for when an image has finished loading. Increments the loaded image count and logs the image
    onAssetLoaded(image) {
        this.length += 1
        const percent = this.length / this.elements.images.length
        this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

        if (percent === 1) {
            this.onLoaded()
        }
    }

    // 5) preloader --- Create loaders for each image. Assigns a new Image object for each element and sets the onload event
    createLoader() {
        each(this.elements.images, (element) => {
            element.onload = () => {
                this.onAssetLoaded(element)
            }
            element.src = element.getAttribute('data-src')
        })
    }

    // 8. destroy preloader after loading is completed
    destroy() {
        this.element.parentNode.removeChild(this.element)
    }
}

// Call preloader at the entry point (app class)
// Use EventEmitter to listen for the load complete event from the preloader

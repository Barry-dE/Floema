import { each } from 'lodash'
import Component from '../classes/Component'
import gsap from 'gsap'
import { split } from '../utils/text'

export default class Preloader extends Component {
    constructor() {
        super({
            element: '.preloader',
            elements: {
                title: '.preloader_text',
                number: '.preloader_number',
                images: document.querySelectorAll('img'), //select all images of the website
                numberText: '.preloader_number_text',
            },
        })
        //wrap spans in two different elements to create an overflow hidden effect (span 1)
        split({
            element: this.elements.title,
            expression: '<br>',
        })
        // (span 2)
        split({
            element: this.elements.title,
            expression: '<br>',
        })

        this.elements.titleSpans =
            this.elements.title.querySelectorAll('span span')

        this.length = 0 // initial length of images

        this.createLoader()
    }

    //Load the images
    createLoader() {
        each(this.elements.images, (img) => {
            // create a new image
            const image = new Image()
            console.log(img)
            // get the images by the data-src attribute
            img.src = img.getAttribute('data-src')
            // get the loaded images and pass them to the onAssetLoaded method
            img.onload = () => this.onAssetLoaded(image)
        })
    }

    onAssetLoaded(image) {
        this.length += 1 // the number of loaded images

        // Get preloader number dynamically
        const loadingPercentage = this.length / this.elements.images.length

        // set the preloader element to the percentage
        this.elements.numberText.innerHTML = `${Math.round(loadingPercentage * 100)}%`

        if (loadingPercentage === 1) {
            this.onLoaded()
        }
    }

    // notify the app entry point that the loading has been completed and animate the preloader out.
    onLoaded() {
        return new Promise((resolve) => {
            this.animateOut = gsap.timeline({
                delay: 3,
            })
            // animate preloader text
            this.animateOut.to(this.elements.titleSpans, {
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                y: '100%',
            })

            this.animateOut.to(
                this.elements.numberText,
                {
                    duration: 1.5,
                    ease: 'expo.out',
                    stagger: 0.1,
                    y: '100%',
                },
                '-=1.4',
            )

            //animate out the preloader
            this.animateOut.to(
                this.element,
                {
                    duration: 1.5,
                    ease: 'expo.out',
                    transformOrigin: '0 0',
                    scaleY: 0,
                },
                '-=1',
            )

            this.animateOut.call(() => {
                this.emit('completed')
            })
        })
    }

    // destroy preloader
    destroy() {
        this.element.parentNode.removeChild(this.element)
    }
}

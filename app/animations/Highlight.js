import gsap from 'gsap'
import Animation from '../classes/animation'

export default class Highlights extends Animation {
    constructor({ element, elements }) {
        // Call the superclass constructor
        super({
            element,
            elements,
        })

        // Calculate the positions of the title lines on resize
        this.onResize()
    }

    // Animate the titles into view
    animateIn() {
        this.timelineIn = gsap.timeline({
            delay: 0.5,
        })

        // Ensure the main element is visible
        this.timelineIn.fromTo(
            this.element,
            {
                autoAlpha: 0,
                scale: 1.2,
            },
            {
                autoAlpha: 1,
                scale: 1,
                ease: 'expo.out',
                duration: 1.5,
            },
        )

        // Start all animations at the same time
    }

    // Animate the titles out of view
    animateOut() {
        gsap.set(this.element, {
            autoAlpha: 0,
        })
    }

    onResize() {}
}

// Instantiate the Titles class in the Pages class

// Call onResize in the Pages class

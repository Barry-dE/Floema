import gsap from 'gsap'
import Animation from '../classes/animation'
import { split, calculate } from '../utils/text'
import { each } from 'lodash'

export default class Paragraph extends Animation {
    constructor({ element, elements }) {
        // Call the superclass constructor
        super({
            element,
            elements,
        })

        this.elementLinesSpan = split({ element: this.element, append: true })

        // Calculate the positions of the title lines on resize
        this.onResize()
    }

    // Animate the titles into view
    animateIn() {
        this.timelineIn = gsap.timeline({
            delay: 0.5,
        })

        // Ensure the main element is visible
        this.timelineIn.set(this.element, {
            autoAlpha: 1,
        })

        // Animate each line of the paragraph from bottom to top
        each(this.elementsLines, (line, index) => {
            this.timelineIn.fromTo(
                line,
                {
                    y: '100%',
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: 'expo.out',
                    y: '0%',
                },
                0, // Start all animations at the same time
            )
        })
    }

    // Animate the titles out of view
    animateOut() {
        gsap.set(this.element, {
            autoAlpha: 0,
        })
    }

    // Resize the elements' title lines as the browser width changes
    onResize() {
        this.elementsLines = calculate(this.elementLinesSpan)
    }
}

// Instantiate the Titles class in the Pages class

// Call onResize in the Pages class

import Animation from '../classes/animation'
import gsap from 'gsap'
import { calculate, split } from '../utils/text'
import { each } from 'lodash'

export default class Title extends Animation {
    constructor({ element, elements }) {
        super({
            element,
            elements,
        })

        split({
            element: this.element,
            append: true,
        })

        split({
            element: this.element,
            append: true,
        })

        this.elementLinesSpan = this.element.querySelectorAll('span span')
    }

    animateIn() {
        this.timelineIn = gsap.timeline({
            delay: 0.5,
        })

        gsap.set(this.timelineIn, {
            autoAlpha: 1,
        })

        each(this.elementsLines, (line, index) => {
            this.timelineIn.fromTo(
                line,
                {
                    y: '100%',
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    delay: index * 0.2,
                    duration: 1.5,
                    ease: 'expo.out',
                    y: '0%',
                },
                0,
            )
        })
    }

    animateOut() {
        gsap.set(this.elementsLines, {
            autoAlpha: 0,
        })
    }

    onResize() {
        this.elementsLines = calculate(this.elementLinesSpan)
    }
}

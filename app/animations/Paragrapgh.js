import Animation from '../classes/animation'
import gsap from 'gsap'
import { calculate, split } from '../utils/text'
import { each } from 'lodash'

export default class Paragraph extends Animation {
    constructor({ element, elements }) {
        super({
            element,
            elements,
        })

        console.log(this.element)
        this.elementLinesSpans = split({
            element: this.element,
            append: true,
        })

        console.log(this.elementLinesSpans)
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

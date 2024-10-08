import gsap from 'gsap'
import { each } from 'lodash'
import Animation from '../classes/animation'

export default class Highlights extends Animation {
    constructor(element, elements) {
        super({ element, elements })
    }

    animateIn() {
        this.timelineIn = gsap.timeline({
            delay: 0.5,
        })

        this.timelineIn.fromTo(
            this.element,
            {
                autoAlpha: 0,
                scale: 1.2,
            },
            {
                autoAlpha: 1,
                duration: 1.5,
                ease: 'expo.out',
                scale: 1,
            },
        )
    }

    animateOut() {
        gsap.set(this.element, {
            autoAlpha: 0,
        })
    }

    onResize() {}
}

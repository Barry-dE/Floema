import gsap from 'gsap'
import Component from '../classes/Component'
import {
    COLOR_BRIGHT_GREY,
    COLOR_QUATER_SPANISH_WHITE,
} from '../classes/Colors'

export default class Navigation extends Component {
    constructor() {
        super({
            element: '.navigation',
            elements: {
                items: '.navigation__list__item',
                links: '.navigation__list__link',
            },
        })
    }

    onChange(template) {
        if (template === 'about') {
            gsap.to(this.element, {
                color: COLOR_BRIGHT_GREY,
                duration: 1.5,
            })

            gsap.to(this.elements.items[0], {
                autoAlpha: 1,
            })

            gsap.to(this.elements.items[1], {
                autoAlpha: 0,
            })
        } else {
            gsap.to(this.element, {
                color: COLOR_QUATER_SPANISH_WHITE,
                duration: 1.5,
            })

            gsap.to(this.elements.items[0], {
                autoAlpha: 0,
            })

            gsap.to(this.elements.items[1], {
                autoAlpha: 1,
            })
        }
    }
}

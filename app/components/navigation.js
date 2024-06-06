import Component from '../classes/Component'
import gsap from 'gsap'
import { COLOR_BRIGHT_GREY, COLOR_QUATER_SPANISH_WHITE } from '../utils/color'
export default class Navigation extends Component {
    constructor({ template }) {
        super({
            element: '.navigation',
            elements: {
                items: '.navigation__list__item',
                links: '.navigation__list__link',
            },
        })

        this.onChange(template)
    }

    //checks the current page template and displays the correct link
    onChange(template) {
        console.log(template)

        if (template === 'about') {
            gsap.to(this.element, {
                color: COLOR_BRIGHT_GREY,
                duration: 1.5,
            })

            gsap.to(this.elements.items[0], {
                autoAlpha: 1,
                duration: 0.75,
                delay: 0.75,
            })

            gsap.to(this.elements.items[1], {
                autoAlpha: 0,
                duration: 0.75,
            })
        } else {
            gsap.to(this.element, {
                color: COLOR_QUATER_SPANISH_WHITE,
                duration: 1.5,
            })

            gsap.to(this.elements.items[0], {
                autoAlpha: 0,
                duration: 0.75,
            })

            gsap.to(this.elements.items[1], {
                autoAlpha: 1,
                duration: 0.75,
                delay: 0.75,
            })
        }
    }
}

//initialized in entry point

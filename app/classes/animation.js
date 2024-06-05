import Component from './Component'

export default class Animation extends Component {
    constructor({ element, elements }) {
        super({
            element,
            elements,
        })

        this.createObserver()
        this.animateIn() //animate titles in as it intersects with the viewport
    }

    //1) text animations. intersection observer
    createObserver() {
        this.observer = new window.IntersectionObserver((enteries) => {
            enteries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateIn()
                } else {
                    this.animateOut()
                }
            })
        })

        this.observer.observe(this.element)
    }

    //to be overridden by child classes
    animateIn() {}

    animateOut() {}
}

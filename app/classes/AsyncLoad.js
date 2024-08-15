import Component from './Component'

export default class AsyncLoad extends Component {
    constructor({ element }) {
        super({ element })

        this.createObserver()
    }

    createObserver() {
        const imgOptions = {
            rootMargin: '500px',
            threshold: 0.01,
        }

        this.observer = new IntersectionObserver((enteries) => {
            enteries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!this.element.src) {
                        this.element.src = this.element.getAttribute('data-src')
                        this.element.onload = () => {
                            this.element.classList.add('loaded')
                        }
                    }
                }
            }, imgOptions)
        })

        this.observer.observe(this.element)
    }
}

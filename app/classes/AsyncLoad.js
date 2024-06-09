import Component from './Component'

//Loads images asynchronously
export default class AsyncLoad extends Component {
    constructor(element) {
        super({ element })

        this.createObserver()
    }

    createObserver() {
        this.observer = new window.IntersectionObserver((enteries) => {
            enteries.forEach((entry) => {
                if (entry.isIntersecting) {
                    //if image element is intersecting with the view port, set that src
                    if (this.element.src) {
                        this.element.src = this.element.getAttribute('data-src')
                        // to prevent the images from flashing as they enter the viewport
                        this.element.onload = () => {
                            this.element.classList.add('loaded')
                        }
                    }
                }
            })
        })

        this.observer.observe(this.element)
    }
}

//call in page

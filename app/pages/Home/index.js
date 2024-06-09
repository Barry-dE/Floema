import Page from '../../classes/Pages'

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: {
                navigation: document.querySelector('.navigation'),
                button: '.home__link',
            },
        })

        this.button = document.querySelector('.home__link')
    }

    create() {
        super.create()
        this.link = new Button({
            element: this.button,
        })
    }

    destroy() {
        super.destroy()
        this.link.removeEventListeners()
    }
}

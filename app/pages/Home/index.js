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
    }

    create() {
        super.create()
        const [link] = this.elements.button
        link.addEventListener('click', () => {
            console.log('you clicked me')
        })
    }
}

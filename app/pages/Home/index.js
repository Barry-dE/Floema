import Pages from '../../classes/Pages'

export default class Home extends Pages {
    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: {
                link: '.home__link',
                navigation: document.querySelector('.navigation'),
            },
        })
    }

    create() {
        super.create()
        this.elements.link.addEventListener('click', (e) => {
            e.preventDefault()
            console.log('you clicked me')
        })
    }
}

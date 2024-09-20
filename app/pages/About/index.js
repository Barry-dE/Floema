import Pages from '../../classes/Pages'

export default class About extends Pages {
    constructor() {
        super({
            id: 'about',
            element: '.about',
            elements: {
                title: '.about__title',
                wrapper: '.about__wrapper',
                navigation: document.querySelector('.navigation'),
            },
        })
    }
}

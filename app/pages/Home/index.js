import Page from '../../classes/Pages'

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',
            element: '.home',
            elements: {
                button: '.home_link',
                naviagtion: document.querySelector('.navigation'),
            },
        })
        console.log('home')
    }

    addEventListeners() {}
}

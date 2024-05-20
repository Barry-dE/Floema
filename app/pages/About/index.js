import { log } from 'util'
import Page from '../../classes/Pages'

export default class About extends Page {
    constructor() {
        super({
            id: 'about',
            element: '.about',
            elements: {
                title: '.about_title',
                wrapper: '.about_wrapper',
                navigation: document.querySelector('.navigation'),
            },
        })

        console.log('About')
    }
}

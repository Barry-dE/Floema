import { title } from 'process'
import Page from '../../classes/Pages'
export default class About extends Page {
    constructor() {
        super({
            id: 'about',
            element: '.about',
            elements: {
                title: '.about__title',
                
            },
        })
    }
}

import Pages from '../../classes/Pages'
import Button from '../../classes/Button'

export default class Detail extends Pages {
    constructor() {
        super({
            id: 'detail',
            element: '.detail',
            elements: {
                button: '.detail_button ',
            },
        })
    }

    create() {
        super.create()
        this.link = new Button({
            element: this.elements.button,
        })
    }

    destroy() {
        super.destroy()
        this.link.removeEventListeners()
    }
}

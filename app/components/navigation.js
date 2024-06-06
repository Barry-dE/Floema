import Component from '../classes/Component'

export default class Navigation extends Component {
    constructor({ template }) {
        super({
            element: '.navigation',
            elements: {},
        })

        this.onChange(template)
    }

    //checks the current page template and displays the correct link
    onChange(template) {
        console.log(template)
    }
}

//initialized in entry point

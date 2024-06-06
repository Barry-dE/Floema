import gsap from 'gsap'

class Colors {
    change({ backgroundColor, color }) {
        console.log(document.documentElement)
        gsap.to(document.documentElement, {
            backgroundColor,
            color,
            duration: 1.5,
        })
    }
}

export const ColorsManager = new Colors()
//use in the page classes in the show function

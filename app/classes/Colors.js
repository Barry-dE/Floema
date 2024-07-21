import gsap from 'gsap'

export const COLOR_QUATER_SPANISH_WHITE = '#f9f1e7'
export const COLOR_BRIGHT_GREY = ' #37384c'

class Colors {
    change({ backgroundColor, color }) {
        gsap.to(document.documentElement, {
            backgroundColor,
            color,
            duration: 1.5,
        })
    }
}

export const colorsManager = new Colors()

import { map } from 'lodash'
import Media from './Media'
import { Plane, Transform } from 'ogl'

export default class {
    constructor({ gl, scene, sizes }) {
        this.gl = gl
        this.sizes = sizes
        this.group = new Transform()
        this.mediasElements = document.querySelectorAll('.home__gallery__media')
        this.createGeometry()
        this.createGallery()
        this.group.setParent(scene)
    }

    createGeometry() {
        this.geometry = new Plane(this.gl)
    }

    createGallery() {
        this.medias = map(this.mediasElements, (element, index) => {
            return new Media({
                element,
                index,
                gl: this.gl,
                geometry: this.geometry,
                scene: this.group,
                sizes: this.sizes,
            })
        })
    }

    onResize(event) {
        map(this.medias, (media) => media.onResize(event))
    }
}

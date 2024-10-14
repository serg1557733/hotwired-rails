import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    copy(e) {
        console.log('click')
        window.navigator.clipboard.writeText(e.target.src)
        this.dispatch('copied', {detail: {content: 'Link has copied'}})
    }
}
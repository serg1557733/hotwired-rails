import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['image'] //name from tag
    connect() {
        const title = document.createElement('p')
        title.textContent = this.imageTarget.alt;
        this.element.appendChild(title)
    }

    copy(e) {
        console.log('click')
        window.navigator.clipboard.writeText(e.target.src)
        this.dispatch('copied', {detail: {content: 'Link has copied'}})
    }
}
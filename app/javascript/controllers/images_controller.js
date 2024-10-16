import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['image', 'title', 'save'] //name from tag
    static classes = ['loading']
    static values = {id: String}
    connect() {
        const title = document.createElement('p')
        title.textContent = this.imageTarget.alt;
        title.dataset.imagesTarget = 'title';
        title.contentEditable = true
        title.dataset.action = 'click->images#editTitle'
        this.element.appendChild(title)
    }

    copy(e) {
        window.navigator.clipboard.writeText(e.target.src)
        this.dispatch('copied', {detail: {content: 'Link has copied'}})
    }

    editTitle(e){
        if (this.hasSaveTarget) return
        const btn = document.createElement('button')
        btn.textContent = "Save"
        btn.classList = 'bg-red-500'
        btn.dataset.imagesTarget = 'save';
        btn.dataset.action = 'click->images#saveTitle'
        e.target.insertAdjacentElement("afterend", btn )
    }

    async saveTitle(e) {
        e.preventDefault();
        e.target.disabled = true;
        e.target.classList.add(this.loadingClass)

        const formData = new FormData();
        formData.append('image[title]', this.titleTarget.innerText)
        await this.doPatch(`api/images/${this.idValue}`, formData)
        e.target.remove();
    }


    titleTargetConnected(){
        console.log('element connected')
    }

    async doPatch(url, body){
        const csrfToken = document.getElementsByName('csrf-token')[0].content
        await fetch(url, {
            method: 'PATCH',
            body,
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
    }
}
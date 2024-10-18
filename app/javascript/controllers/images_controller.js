import { Controller } from "@hotwired/stimulus"
import { patch } from '@rails/request.js'


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
         this.doPatch(`api/images/${this.idValue}`,
            JSON.stringify({image: { title: this.titleTarget.innerText}}))
        e.target.remove();
    }

    titleTargetConnected(){
        console.log('element connected')
    }

    async doPatch(url, body){
       const response =  await patch(url, {body})
        if (!response.ok) throw new Error('filed to patch')
    }
}
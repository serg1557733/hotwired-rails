import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
    initialize () {
        this.p = document.querySelector('.toast');
    }
    show({detail: {content}}) {
        console.log('show called' )
        this.p.innerText = content
    }
}
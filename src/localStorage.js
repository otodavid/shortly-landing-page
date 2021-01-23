import { ui } from './ui.js';

class Storage {
    constructor() {}

    getLinks() {
        let urlStore;
        if(localStorage.getItem('urlStore') === null) {
            urlStore = [];
        } else {
            urlStore = JSON.parse(localStorage.getItem('urlStore'));
        }

        return urlStore;
    }

    displayLinks() {
        const urlStore = this.getLinks('urlStore');
        urlStore.forEach(url => {
            ui.displayShortUrl(url)
        });
    }

    saveLinks(url) {
        const urlStore = this.getLinks('urlStore');
        urlStore.push(url);
        localStorage.setItem('urlStore', JSON.stringify(urlStore));
    }

    clearLinks() {
        let urlStore = this.getLinks('urlStore');
        urlStore = [];
        localStorage.setItem('urlStore', JSON.stringify(urlStore));
    }
}

export const store = new Storage()
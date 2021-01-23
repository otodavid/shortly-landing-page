import { urlApi } from './custom-url.js';
import { ui } from './ui.js';
import { store } from './localStorage.js'

const mobileMenu = document.querySelector('.mobile-nav');
const shortenUrlBtn = document.querySelector('#form-control button');
const urlInput = document.querySelector('#form-control input');

let custom;

store.displayLinks();

// mobile menu
mobileMenu.addEventListener('click', () => {
    const headerNav = document.getElementById('header-nav');

    if (headerNav.classList.contains('opacity-0')) {
        headerNav.classList.remove('opacity-0', 'left-full');
    } else {
        headerNav.classList.add('opacity-0', 'left-full');
    }
})

shortenUrlBtn.addEventListener('click', () => {
    let key = (urlInput.value.length >= 1) ? isUrl(urlInput.value) : '';

    switch (key) {
        case true:
            // call shrtcode api
            urlApi.getShortUrl(urlInput.value)
                .then(result => {
                    successDataFetch(result.link);
                })
                .catch(error => {
                    ui.displayAlert("There was an error. Check Connection");
                    console.error('error in Api call', error);
                })
            break;

        case false:
            ui.displayAlert('URL is invalid');
            break;

        default:
            ui.displayAlert('Please add a valid link');
            break;
    }
})

const isUrl = (url) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}

urlInput.addEventListener('keypress', () => {
    ui.clearAlert();
})

const successDataFetch = (shortLink) => {
    const shortUrl = shortLink;
    const originalUrl = urlInput.value;

    custom = {
        originalUrl,
        shortUrl,
    };

    ui.displayShortUrl(custom);

    store.saveLinks(custom);

    test();
}

const shortLinksDiv = document.getElementById('short-links');
shortLinksDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-link')) {
        const shortUrl = e.target.parentElement.firstElementChild.textContent;
        ui.copyLink(shortUrl, e.target);
        
        // set copy buttons styles to default
        setTimeout(() => {
            e.target.textContent = 'Copy';
            e.target.style.backgroundColor = 'rgb(42, 207, 207)';
        }, 1000);
    }
})

// add Event Listener to clear-link Button
function test() {
    const clearLinks = document.querySelector('#clear-links');
    clearLinks.addEventListener('click', () => {
        ui.clearLinks();
        store.clearLinks();
    })
}

test();

// add shadow to top of short links to div when scrolling
function scrollFunction() {
    if (shortLinksDiv.scrollTop > 10) {
        shortLinksDiv.style.boxShadow = "inset 0px 10px 15px rgba(0, 0, 0, 0.15)"
    } else {
        shortLinksDiv.style.boxShadow = null;
    }
}

shortLinksDiv.addEventListener('scroll', scrollFunction);

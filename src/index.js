import { urlApi } from './url-api.js';
import { ui } from './ui.js';
import { linksStorage } from './links-storage.js'

const hamburgerBtn = document.querySelector('.mobile-nav');
const shortenItBtn = document.querySelector('#form-control button');
const urlInput = document.querySelector('#form-control input');
const linksContainer = document.getElementById('links-container');

// this will contain the full and short url for any url inputted
let linkInfo = {};

linksStorage.displayLinks();

// mobile menu
hamburgerBtn.addEventListener('click', () => {
    const headerNav = document.getElementById('header-nav');

    if (headerNav.classList.contains('opacity-0')) {
        headerNav.classList.remove('opacity-0', 'left-full');
    } else {
        headerNav.classList.add('opacity-0', 'left-full');
    }
})

shortenItBtn.addEventListener('click', () => {
    // remove any alert message if any exists
    const alert = document.querySelector('.alert');
    if(alert.classList.contains('error')) {
        ui.clearAlert('error');
    }
    
    // check if input is valid, invalid or nothing was inputted and pass the value to the switch statement
    let key = (urlInput.value.length >= 1) ? isUrl(urlInput.value) : '';

    switch (key) {
        case true:
            // call shrtcode api
            urlApi.getShortUrl(urlInput.value)
                .then(result => {
                    successfulDataFetch(result.link);
                })
                .catch(error => {
                    ui.displayAlert("error", "There was an error. Check Connection");
                    console.error('error in Api call', error);
                })
            break;

        case false:
            ui.displayAlert('error', 'URL is invalid');
            break;

        default:
            ui.displayAlert('error', 'Please add a valid link');
            break;
    }
})

const isUrl = (url) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}

const successfulDataFetch = (shortLink) => {
    const shortUrl = shortLink;
    const fullUrl = urlInput.value;

    linkInfo = {
        fullUrl,
        shortUrl,
    };

    ui.displayShortUrl(linkInfo);

    linksStorage.saveLinks(linkInfo);

    clearLinksEventListener();
}

const copyLinkInterations = (targetButton) => {
    if (targetButton.classList.contains('copy-link')) {
        const shortUrl = targetButton.parentElement.firstElementChild.textContent;
        ui.copyLink(shortUrl, targetButton);
        
        // set copy buttons styles to default
        setTimeout(() => {
            targetButton.textContent = 'Copy';
            targetButton.style.backgroundColor = 'rgb(42, 207, 207)';
        }, 1000);
    }
}

// function to add Event Listener to clear-link Button once it's shown
function clearLinksEventListener() {
    const clearLinksBtn = document.querySelector('#clear-links');
    if(!clearLinksBtn.classList.contains('hidden'))
    clearLinksBtn.addEventListener('click', () => {
        // clear links from both UI and local storage
        ui.clearLinks();
        linksStorage.clearLinks();
    })
}

function scrollFunction() {
    // add shadow to top of short links to div when scrolling
    if (linksContainer.scrollTop > 10) {
        linksContainer.style.boxShadow = "inset 0px 10px 15px rgba(0, 0, 0, 0.15)"
    } else {
        linksContainer.style.boxShadow = null;
    }
}

urlInput.addEventListener('keypress', () => {
    ui.clearAlert('error');
})

linksContainer.addEventListener('click', (e) => {
    copyLinkInterations(e.target);
})

// add event listener to clear links when the button is shown if there are links in the local storage. If there are no links, the button is not shown and the event is not added 
clearLinksEventListener();

linksContainer.addEventListener('scroll', scrollFunction);

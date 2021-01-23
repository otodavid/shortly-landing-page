class UI {
    constructor() {
        this.urlInput = document.querySelector('#form-control input');
        this.shortLinks = document.getElementById('short-links');
        this.copyBtn = document.querySelector('#short-links button');
        this.alert = document.querySelector('.alert');
    }

    displayShortUrl(url) {
        let output = '';

        output = `
        <div class="bg-white rounded-md mb-6 lg:flex lg:justify-between lg:items-center lg:flex-wrap lg:px-6 lg:py-3">
          <div class="border-b border-neutral-gray px-4 py-2 lg:border-0 lg:p-0 lg:w-3/5">
            <p id="original-url" class="text-neutral-darkViolet truncate">${url.originalUrl}</p>
          </div>
          <div class="shortened-wrapper">
            <p id="short-url" class="text-primary-cyan">${url.shortUrl}</p>
            <button type="button" class="copy-link">Copy</button>
          </div>
        </div>`;

        this.shortLinks.innerHTML += output;

        this.showClearButton();

        this.urlInput.value = '';
    }

    displayAlert(message) {
        this.urlInput.classList.add('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove('hidden');
        this.alert.classList.add('block');
        this.alert.textContent = message;
    }

    clearAlert() {
        this.urlInput.classList.remove('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove('block');
        this.alert.classList.add('hidden');
    }

    async copyLink(shortUrl, copyButton) {
        // Using the Clipboard API to Copy Text
        try {
            await navigator.clipboard.writeText(shortUrl);
            copyButton.innerHTML = 'Copied';
            copyButton.style.backgroundColor = 'rgb(59, 48, 84)';
        } catch (error) {
            console.error('Error in copying URL', error);
            this.displayAlert('Error in copying URL')
        }
    }

    showClearButton() {
        const allShortUrl = document.querySelectorAll('#short-links > div:not(:first-of-type)');
        const clearLinksBtn = document.querySelector('#short-links > div:first-of-type');

        if(allShortUrl.length > 0) {
            clearLinksBtn.classList.remove('hidden')
        } else {
            clearLinksBtn.classList.add('hidden')
        }
    }

    clearLinks() {
        const allShortUrl = document.querySelectorAll('#short-links > div:not(:first-of-type)');

        allShortUrl.forEach(url => {
            url.remove()
        })

        this.showClearButton();
    }
}

export const ui = new UI();
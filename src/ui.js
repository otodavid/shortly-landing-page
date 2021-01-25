class UI {
    constructor() {
        this.urlInput = document.querySelector('#form-control input');
        this.linksContainer = document.getElementById('links-container');
        this.alert = document.querySelector('.alert');
    }

    displayShortUrl(url) {
        let output = '';

        output = `
        <div id="link-content" class="bg-white rounded-md mb-6 md:flex md:justify-between md:items-center md:flex-wrap md:px-4 md:py-2 lg:px-6 lg:py-3">
        <div class="border-b border-neutral-gray px-4 py-2 md:border-0 md:p-0 lg:w-3/5">
          <p id="full-url" class="text-neutral-darkViolet truncate">${url.fullUrl}</p>
        </div>
        <div class="shortened-wrapper">
          <p id="short-url" class="text-primary-cyan">${url.shortUrl}</p>
          <button type="button" class="copy-link">Copy</button>
        </div>
      </div>`;

        this.linksContainer.innerHTML += output;

        this.showClearButton();

        this.urlInput.value = '';
    }

    displayAlert(type, message) {
        this.urlInput.classList.add('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove('hidden');
        this.alert.classList.add(type, 'block');
        this.alert.textContent = message;
    }

    clearAlert(type) {
        this.urlInput.classList.remove('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove(type, 'block');
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
        const links = document.querySelectorAll('#link-content');
        const clearLinksBtn = document.querySelector('#links-container > div:first-of-type');

        if(links.length > 0) {
            clearLinksBtn.classList.remove('hidden')
        } else {
            clearLinksBtn.classList.add('hidden')
        }
    }

    clearLinks() {
        const links = document.querySelectorAll('#link-content');

        links.forEach(item => {
            item.remove()
        })

        this.showClearButton();
    }
}

export const ui = new UI();
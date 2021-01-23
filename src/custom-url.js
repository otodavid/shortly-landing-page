class UrlAPI {
    // Fetch short Url Link from shrtcode API
    async getShortUrl(url) {
        try {
            const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
            const responseData = await response.json();
            const links = await responseData.result;
            return {
                link: links.full_short_link2,
            };
        } catch (error) {
            console.log('error at api: ', error.message)
        }
    };
}

export const urlApi = new UrlAPI()
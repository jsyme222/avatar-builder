export const URL = "http://192.168.0.34:8000";

export function fullURL(url) {
    let fullURL = url;
    if(url.slice(0, 4) !== "http"){
        fullURL = URL + url
    }
    return fullURL;
}

const PATHS = {
    'getAvatar': '/api/avatar/view/',
    'baseImages': '/api/avatar/base-images',
    'genders': '/api/avatar/genders',
    'accessories': '/api/item/view/accessories',
    'bottoms': '/api/item/view/bottoms',
    'faces': '/api/item/view/faces',
    'hair': '/api/item/view/hair',
    'tops': '/api/item/view/top',
};

const DEFAULT_OPTIONS = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};

export function APIHandler(url, options={}) {
    let API_URL = !Array.isArray(url) ?
        URL + PATHS[url]
        :
        URL + PATHS[url[0]] + url[1]
        ;

    let OPTIONS = {
        ...DEFAULT_OPTIONS,
        ...options,
        headers: {
            ...DEFAULT_OPTIONS.headers,
            ...options.headers
        },
    };
    if(OPTIONS.method !== "GET" && OPTIONS.body){
        let body = OPTIONS.body;
        let BODY = (typeof(body) === "object") ? JSON.stringify(body): null;
        OPTIONS.body = BODY;
    }

    async function fetchAPI() {
        let response = await fetch(
            API_URL,
            OPTIONS
        )
        .then(response => response.json())

        return response;
    }

    return fetchAPI()

}
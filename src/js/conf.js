export const URL = "http://192.168.68.107:8000";

const PATHS = {
    'baseImages': '/api/avatar/base-images',
    'accessories': '/api/item/view/accessories',
    'bottoms': '/api/item/view/bottoms',
    'faces': '/api/item/view/faces',
};

const DEFAULT_OPTIONS = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
};

export function APIHandler(url, options={}) {
    let API_URL = URL + PATHS[url];

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
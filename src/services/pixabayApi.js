import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31430528-1a800584242396ee95291d1e0';

async function getPhotos(query = '', page = 1) {
    const response = await axios.get('/', {
            params: {
                key: API_KEY,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
                q: query,
                page,
            }
    });
    
    return response.data;
}

const pixabayApi = {
    getPhotos,
}

export default pixabayApi;
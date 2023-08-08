
import axios from 'axios';
import { Notify } from 'notiflix';
const API_KEY = "38625764-7015af45a4c628fe7e69462bb";
const URL ="https://pixabay.com/api/";

export class PixabayAPI {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImage() {
        try {
            const options = {
                params: {
                    key: API_KEY,
                    q: this.searchQuery,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: true,
                    page: this.page,
                    per_page: 40,
                },
            };
            const url = `${URL}`;
            const response = await axios.get(url, options);
            const data = await response.data;

            this.page += 1;
            this.totalHits = response.data.totalHits;
            return data;
        } catch (error) {
            Notify.failure("Failed to feth images .Please try again later.")
        }
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
   
}

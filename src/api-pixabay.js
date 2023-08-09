import axios from 'axios';
import { Notify } from 'notiflix';
export  class PixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
    async fetchImage() {
      
    const options = {
      method: 'GET',
      url: 'https://pixabay.com/api/',
      params: {
        key: '38625764-7015af45a4c628fe7e69462bb',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
        };
    try {
      const response = await axios(options);
      const data = response.data;
      this.page += 1;
      this.totalHits = response.data.totalHits;
      return data;
    } catch (error) {
      console.error(error);
    }
    }
    resetPage() {
        this.page += 1;
    }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// import axios from 'axios';
// import { Notify } from 'notiflix';
// const API_KEY = "38625764-7015af45a4c628fe7e69462bb";
// const URL ="https://pixabay.com/api/";

// export  class PixabayAPI {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//         this.hits = 0;
//         this.totalHitshits = 0;
//     }

//     async fetchImage() {
//         try {
//             const options = {
//                 params: {
//                     key: API_KEY,
//                     q: this.searchQuery,
//                     image_type: "photo",
//                     orientation: "horizontal",
//                     safesearch: true,
//                     page: this.page,
//                     per_page: 40,
//                 },
//             };
//             const url = `${URL}`;
//             const response = await axios.get(url, options);
//             const data = await response.data;
//             this.page += 1;
//             this.totalHits = response.data.totalHits;
//             return data;
//         } catch (error) {
//         Notify.failure("Failed to feth images .Please try again later.")
//         }
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
   
// }

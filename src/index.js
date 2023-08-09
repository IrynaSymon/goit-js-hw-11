import { Notify } from "notiflix";
import { PixabayAPI } from "./api-pixabay";
import { renderMarcupForGallery } from "./photosGallery";
import { searchForm, galleryList, loadMoreBtn } from "./refs"

const pixabayService = new PixabayAPI();

searchForm.addEventListener("submit", handlerSearch);
loadMoreBtn.addEventListener("click", onLoadMoreBtn);

loadMoreBtn.classList.add("is-hidden");
async function handlerSearch(evt) {
   
        evt.preventDefault();
        loadMoreBtn.classList.add("is-hidden");
        galleryList.innerHTML = '';
        const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
        pixabayService.resetPage();
        if (!searchQuery) {
        Notify.warning("Please type something to search.");
            return;
        }

        pixabayService.query = searchQuery;
        pixabayService.page = 1;
        pixabayService.hits = 0;
    
    evt.currentTarget.reset();
     
 try {
        const data = await pixabayService.fetchImage();
     if (data.hits.length === 0) {
         Notify.failure(
             "Sorry, there are no images matching your search query. Please try again."
         );
     } else {
         renderMarcupForGallery(data);
         Notify.success(`Hooray! We found ${data.totalHits} images.`);
         loadMoreBtn.classList.toggle("is-hidden", data.hits.length < 40);
     }
    
    } catch (error) {
     Notify.info(" We're sorry, but you've reached the end of search results."); 
     console.log(error)
    }
}

async function onLoadMoreBtn() {
    try {
        const data = await pixabayService.fetchImage();
        renderMarcupForGallery(data);
        scrollGallery();
        loadMoreBtn.classList.toggle("is-hidden", data.hits.length < 40);
        const totalPages = Math.ceil(data.totalHits / 40);
        if (pixabayService.page > totalPages) {
           Notify.info(" We're sorry, but you've reached the end of search results."); 
        }
    } catch (error) {
     Notify.failure(error.message)
    }
}

function scrollGallery() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}


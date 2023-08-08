
import { Notify } from "notiflix";
import { PixabayAPI } from "./api-pixabay";
import { renderMarcupForGallery } from "./photosGallery";
import { searchForm, galleryList, loadMoreBtn } from "./refs"


const pixabayService = new PixabayAPI();

searchForm.addEventListener("submit", handlerSearch);
loadMoreBtn.addEventListener("click", onLoadMoreBtn);

loadMoreBtn.classList.add("is-hidden");
async function handlerSearch(evt) {
    try {
        evt.preventDefault();
       galleryList.innerHTML = ''
        const searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

        if (!searchQuery) {
            Notify.warning("Please type something to search.");

loadMoreBtn.classList.add("is-hidden");
            return;
        }

        pixabayService.query = searchQuery;
        page = 1;
      hits = 0;
      totalHits = 0;

        const data = await pixabayService.fetchImage();
        if (data.hits.length === 0) {
            Notify.failure(
                "Sorry, there are no images matching your search query. Please try again."
            );
loadMoreBtn.classList.remove("is-hidden");
            return;
        }
      renderMarcupForGallery(data);
      
        loadMoreBtn.classList.remove("is-hidden");
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } catch (error) {
        Notify.failure(error.message);
    }
}

async function onLoadMoreBtn() {
    try {
        const data = await pixabayService.fetchImage();
        if (data.hits.length === 0) {
          Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtn.classList.add('is-hidden');
            return;
        }
        if (hits > totalHits) {
            Notify.Notify.info(
                "We're sorry, but you've reached the end of search results."
            );
           loadMoreBtn.classList.add('is-hidden');
            return;
        }
      renderMarcupForGallery(data);
      
        scrollGallery();

        pixabayService.hits += 40;
    } catch (error) {
      Notify.failure(error.message);
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
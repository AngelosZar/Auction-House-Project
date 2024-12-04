import { searchListings } from '../model/listings/search';
import { generateHtml } from '../utilities/generateBidCards';
// import { generateHtml, createSingleBidCard } from '../utilities/generateBidCards';
//
export const searchOverlay = async function () {
  const parentContainer = document.querySelector('main');
  const searchBtn = document.querySelector('#searchBtn');
  let isOverlayOpen = false;

  const searchOverlayContent = `
      <section
        class="fixed inset-0 z-50 bg-light-component dark:bg-purple-dark"
        id="searchContainer"
      >
        <div class="container mx-auto px-4 py-8" id="searchContainerHeader">
          <div class="flex flex-col items-center mb-8">
            <img
              src="./media/header_logos/grayscale-transparent.png"
              alt="logo"
              class="max-w-xs mb-4"
            />
            <h1 class="text-4xl font-extrabold text-center mt-4">Search for treasures</h1>
          </div>
        </div>

        <div class="mb-2 max-w-2xl mx-auto">
          <form action="submit" class="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for items"
              class="input-forms "
            />
            <button
              class="btn btn-primary dark:btn-primary-dark mt-4 h-auto md:w-auto w-full"
              id="onSearch"
            >
              Search
            </button>
          </form>
        </div>

        <button
          class="fixed top-4 right-4 text text-green-3 hover:text-green-1 dark:text-purple-light dark:hover:text-white"
          id="close-search-container"
        >
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div id="searchResultCards" class=""></div>
      </section>
  `;
  if (!searchBtn) return;
  //   event listener on searc hbtn
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!isOverlayOpen) {
      parentContainer.insertAdjacentHTML('afterbegin', searchOverlayContent);
    } else {
      document.querySelector('#searchContainer').remove();
      // can be clicked and inserted only once ..
      // pressing again on search btn closes the searchOverlay. toggle visibility // seperate function /event listener to toggle
      console.log(e.target);
    }
    isOverlayOpen = !isOverlayOpen;

    const searchInput = document.querySelector('#search');
    const searchBtn = document.querySelector('#onSearch');
    // guard clause for yet another null pointer
    if (!searchBtn) return;
    searchBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const searchValue = searchInput.value;
      console.log(searchValue);
      try {
        const data = await searchListings(searchValue);
        const listings = data.data;
        console.log('listings:', listings);
        const parentContainer = document.querySelector('#searchResultCard');
        searchContainerHeader.innerHTML = '';
        parentContainer.innerHTML = '';
        parentContainer.classList.add('bg-light-cards', 'dark:bg-red-400', 'mb-8', 'h-full');
        await generateHtml(listings, parentContainer);
        // await generateHtml(listings, parentContainer);
        searchInput.value = '';
      } catch (error) {
        throw new Error(error);
      }
    });
  });
};
// grabUserInput();
// const generateHtmlOnSearch = async function (listings) {
//   const parentContainer = document.querySelector('#searchResultCard');
//   parentContainer.innerHTML = '';
//   await generateHtml(listings, parentContainer);
// };

// e.preventDefault();
// const searchValue = searchInput.value;
// console.log(searchValue);
// await searchListings(searchValue);
// searchInput.value = '';

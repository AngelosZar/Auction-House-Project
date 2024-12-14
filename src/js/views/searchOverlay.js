import { searchListings } from '../model/listings/search';
import { generateHtml } from '../utilities/generateBidCards';
import { initLazyLoading } from '../utilities/initLazyLoading';
import { initSpinner, terminateSpinner } from '../utilities/spinner';
export const searchOverlay = async function () {
  const parentContainer = document.querySelector('main');
  parentContainer.classList.add('max-w-[1440px]');
  const searchBtn = document.querySelector('#searchBtn');
  let isOverlayOpen = false;

  const searchOverlayContent = `
      <section
        class="fixed inset-0 z-50 bg-light-component dark:bg-purple-dark overflow-y-auto "
        id="searchContainer"
      >
      <div class="max-w-[1440px] mx-auto relative">
        <div class="container mx-auto px-4 pt-20 pb-8" id="searchContainerHeader">
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
          <form action="submit" class="flex flex-col justify-center gap-4 md:flex-row px-4">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for items"
              class="input-forms md:mt-6"
            />
            <button
              class="btn btn-primary dark:btn-primary-dark mt-4 md:mt-0 md:self-center h-auto md:w-auto self-end"
              id="onSearch"
            >
              Search
            </button>
          </form>
        </div>

        <button
          class="absolute top-4 right-4 text text-green-3 hover:text-green-1 dark:text-purple-light dark:hover:text-white"
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
        <div id="searchResultCards" class="grid col-span-1 gap-6 grid-flow-row w-full justify-center md:justify-start md:grid-cols-2 lg:grid-cols-3 max-w[1440px]"></div>
      </div>
    </section>
  `;
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!isOverlayOpen) {
      parentContainer.insertAdjacentHTML('afterbegin', searchOverlayContent);
      document.querySelector('#onSearch')?.addEventListener('click', searchHandler);

      document.querySelector('#close-search-container')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#searchContainer')?.remove();
      });
    } else {
      document.querySelector('#searchContainer')?.remove();
    }
    isOverlayOpen = !isOverlayOpen;
  });
  //
  const searchHandler = async (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('#search');
    const searchValue = search.value;
    console.log(searchValue);
    //
    const parentContainer = document.querySelector('#searchResultCards');
    const headerContainer = document.querySelector('#searchContainerHeader');
    initSpinner(parentContainer);
    try {
      const data = await searchListings(searchValue);
      const listings = data.data;
      //

      //
      if (listings.length === 0) {
        headerContainer.innerHTML = `<h1 class="text-4xl font-extrabold text-center mt-4">There are no results for "${searchValue}"</h1>`;
        parentContainer.innerHTML = '';
        return;
      }
      headerContainer.innerHTML = `<h1 class="text-4xl font-extrabold text-center mt-4">Search results for "${searchValue}"</h1>`;
      parentContainer.innerHTML = '';
      await generateHtml(listings, parentContainer);
      initLazyLoading();
      searchInput.value = '';
    } catch (error) {
      throw new Error(error);
    }
  };
  // add pagination
};

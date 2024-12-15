import { readListings } from '../model/listings/readListings';
import { generateHtml } from './generateBidCards.js';
/**
 *
 * @param {*} data meta data passed from readListings /
 * @param {*} parentContainer / parent container to render cards and append pagination buttons
 */
export const pagination = async function (data, parentContainer) {
  let page = data.currentPage;

  const ifFirstPage = data.isFirstPage || null;
  const ifLastPage = data.isLastPage || null;

  const nextPage = data.nextPage || null;
  const previousPage = data.previousPage || null;

  parentContainer.innerHTML = '';
  const paginationBtns = `    
           <a href="#" class="flex px-4 py-2 group ${!previousPage ? 'hidden' : ''}" id="previousBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 transition transform group-hover:-translate-x-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75-6.75M4.5 12l6.75 6.75"
                ></path>
              </svg>
              <span class="pl-2 text hover:underline">Page ${previousPage}</span>
            </a>
  
            <div class="flex-1"></div>
  
            <a href="#" class="flex px-4 py-2 group ${!nextPage ? 'hidden' : ''}" id="nextBtn">
              <span class="pr-2 text hover:underline">Page ${nextPage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-6 h-6 pt-1 transition transform group-hover:translate-x-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          `;
  parentContainer.insertAdjacentHTML('beforeend', paginationBtns);
};

/**Pagination observer to observe for clicks on pagination buttons and set again the event listeners as the conatent and container and buttons have been rerendered /
 *
 * @returns {function} event listeners for next and previous buttons
 */
export const initPaginationObserver = () => {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  let currentPage = 1;
  const paginationContainer =
    document.querySelector('#pagination-container') ||
    document.querySelector('#pagination-on-my-listings');
  if (!paginationContainer) return;

  const handleNextPage = async (e) => {
    e.preventDefault();
    currentPage += 1;
    await handlePageUpdate(currentPage);
  };

  const handlePreviousPage = async (e) => {
    e.preventDefault();
    currentPage -= 1;
    await handlePageUpdate(currentPage);
  };
  const addEventListeners = () => {
    const nextBtn = document.querySelector('#nextBtn');
    if (!nextBtn) return;

    const previousBtn = document.querySelector('#previousBtn');
    if (!previousBtn) return;

    nextBtn.removeEventListener('click', handleNextPage);
    previousBtn.removeEventListener('click', handlePreviousPage);

    nextBtn.addEventListener('click', handleNextPage);
    previousBtn.addEventListener('click', handlePreviousPage);
  };
  const paginationObserver = new MutationObserver((mutations) => {
    console.log('mutation ', mutations);
    addEventListeners();
  });

  paginationObserver.observe(paginationContainer, config);
  addEventListeners();

  return () => {
    paginationObserver.disconnect();
    const nextBtn = document.querySelector('#nextBtn');
    const previousBtn = document.querySelector('#previousBtn');

    nextBtn.removeEventListener('click', handleNextPage);
    previousBtn.removeEventListener('click', handlePreviousPage);
  };
};

/** Pagination to change to next or previous page depending on user input Previous or Next button.
 * Clears existing listings and pagination buttons and fetches and renders new listings and pagination buttons.
 * Smooth scrolls to the top of its section
 * async function to handle page update on click event of changing page
 * @param {*} pageNumber page number to be updated / fetched and rendered
 * @returns {Promise<void>}
 */
export const handlePageUpdate = async (pageNumber) => {
  try {
    const auctionsContainer = document.querySelector('#live-auctions-container');
    const paginationContainer = document.querySelector('#pagination-container');

    if (!auctionsContainer || !paginationContainer) return;

    auctionsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    const data = await readListings(12, pageNumber, true);
    const listings = data.data;
    await Promise.all([
      generateHtml(listings, auctionsContainer),
      pagination(data.meta, paginationContainer),
    ]);

    const scrollToContainer = document.querySelector('#section-2');
    scrollToContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  } catch (error) {
    throw error;
  }
};

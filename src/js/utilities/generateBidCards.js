import { readListings } from '../model/listings/readListings';
import { formatDateTime } from '../utilities/formatDateTime';
import { authGuard } from './authGuard';
import { bidOnListing } from '../model/listings/bid';

export async function generateBidCards() {
  try {
    const data = await readListings(12, 1, true);
    console.log(data);
    const listings = data.data;
    const parentContainer = document.querySelector('#live-auctions-container');
    if (!parentContainer) return;
    await generateHtml(listings, parentContainer);
    const btnsContainer = document.querySelector('#pagination-container');
    if (!btnsContainer) return;
    await pagination(data.meta, btnsContainer);
    // setInterval(() => {
    //   initPaginationObserver();
    // }, 1000);
  } catch (error) {
    throw error;
  }
}

export const generateHtml = async function (listings, parentContainer) {
  listings.forEach((listing) => {
    const cards = createSingleBidCard(listing);
    parentContainer.insertAdjacentHTML('beforeend', cards);
  });

  document.querySelectorAll('[data-bid-button]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      const highestBid = e.target.closest('[data-highest-bid]').dataset.highestBid;

      if (authGuard()) {
        const bidAmount = prompt('Enter your bid amount. min bid amount is ' + (+highestBid + 1));
        const isValidBid = validateBid(bidAmount, highestBid);

        if (!isValidBid) return;
        const bid = {
          amount: Number(bidAmount),
        };

        await bidOnListing(bid, listingId);
        window.location.reload();
      }
    });
  });

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      if (!authGuard()) return;
      const listingContainer = e.target.closest('[data-listing-id]');
      if (!listingContainer) return;
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      localStorage.setItem('listingId', listingId);
      window.location.href = '/biddings/single-listing/';
    });
  });
};

export const createSingleBidCard = function (listing) {
  const card = `
  <div class="p-4 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md" 
  data-listing-id="${listing.id}" data-tags="${listing.tags?.[0]?.substring(0, 2)}" 
  data-highest-bid='${listing?.bids?.length ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}' ">
  <div class="w-full aspect-[4/3] overflow-hidden pb-2">
    <img
       src="${listing?.media[0]?.url}"
      alt="${listing?.media[0]?.alt}"
      class="w-full h-full object-cover"
    />
  </div>
  <p class="text-md font-semibold py-2">${listing?.title}</p>
  <p>${listing?.seller?.name}</p>
  <div class="flex flex-col">
    <p class="text-xs text-left">Ends at ${formatDateTime(listing?.endsAt)}</p>
    <p class="text-xs text-left">Highest current bid : ${listing?.bids?.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}</p>
  </div>
  <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2"   id="bid-for-Listing" 
  data-bid-button>
    Bid
  </a>`;

  return card;
};

export const validateBid = function (bidAmount, highestBid) {
  bidAmount = Number(bidAmount);
  highestBid = Number(highestBid);

  if (isNaN(bidAmount)) {
    alert('Please enter a valid number');
    return false;
  }

  if (bidAmount < highestBid) {
    alert('Please enter a bid higher than the current highest bid');
    return false;
  }

  if (bidAmount === highestBid) {
    alert('Please enter a bid higher than the current highest bid');
    return false;
  }

  if (bidAmount + 1 > highestBid) alert('Thanks for your bid');
  // redirect to the bid page?
  // if single bid page just refresh the page
  return true;
};

const pagination = async function (data, parentContainer) {
  // const pagination = function (data) {
  let page = data.currentPage;
  console.log('currentPage', page);
  const ifFirstPage = data.isFirstPage || null;
  console.log(ifFirstPage);
  const ifLastPage = data.isLastPage || null;
  console.log(ifLastPage);
  const nextPage = data.nextPage || null;
  console.log('nextpage', nextPage);
  console.log(typeof nextPage);
  const previousPage = data.previousPage || null;

  if (ifFirstPage && ifLastPage) {
    // hide both arrows //
  }
  if (nextPage !== null) {
    // render  next arrow // show page number
  }
  if (previousPage !== null) {
    // render  previous arrow // show page number
  }

  //
  parentContainer.innerHTML = '';
  //
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

const initPaginationObserver = () => {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  let currentPage = 1;
  const paginationContainer = document.querySelector('#pagination-container');
  if (!paginationContainer) {
    console.warn('Pagination container not found');
    return;
  }
  if (!paginationContainer) console.log('hallo');
  // if (!paginationContainer) return;

  const paginationObserver = new MutationObserver((mutations) => {
    console.log('mutation ', mutations);
    const nextBtn = document.querySelector('#nextBtn');
    if (!nextBtn) return;
    console.log(nextBtn);
    const previousBtn = document.querySelector('#previousBtn');
    if (!previousBtn) return;
    if (nextBtn) {
      console.log(nextBtn);
    }

    const handleNextPage = async (e) => {
      e.preventDefault();
      alert('next page');
      currentPage += 1;
      console.log('next page', currentPage);
      await handlePageUpdate(currentPage);
    };

    const handlePreviousPage = async (e) => {
      e.preventDefault();
      currentPage -= 1;
      console.log('previous page', currentPage);
      await handlePageUpdate(currentPage);
    };

    nextBtn.removeEventListener('click', handleNextPage);
    previousBtn.removeEventListener('click', handlePreviousPage);
    //
    nextBtn.addEventListener('click', handleNextPage);
    previousBtn.addEventListener('click', handlePreviousPage);
  });

  paginationObserver.observe(paginationContainer, config);
  console.log('Pagination observer started successfully');

  return () => {
    paginationObserver.disconnect();
  };
};
// cannot have it on function as pagination why ?\ move to the controller
const paginationContainer = document.querySelector('#pagination-container');
if (paginationContainer) {
  initPaginationObserver();
}
// function to handle the upadate of the pagination page number and render the content
//
const handlePageUpdate = async (pageNumber) => {
  try {
    const auctionsContainer = document.querySelector('#live-auctions-container');
    const paginationContainer = document.querySelector('#pagination-container');
    if (!auctionsContainer || !paginationContainer) {
      console.log('containers niet');
      return;
    }
    //
    auctionsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    const data = await readListings(12, pageNumber, true);
    const listings = data.data;
    await generateHtml(listings, auctionsContainer);
    await pagination(data.meta, paginationContainer);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

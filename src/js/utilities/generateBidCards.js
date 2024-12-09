import { readListings } from '../model/listings/readListings';
import { formatDateTime } from '../utilities/formatDateTime';
import { authGuard } from './authGuard';
import { bidOnListing } from '../model/listings/bid';

export async function generateBidCards() {
  try {
    const data = await readListings(12, 1);
    console.log(data);
    const listings = data.data;
    const parentContainer = document.querySelector('#live-auctions-container');
    generateHtml(listings, parentContainer);
    pagination(data.meta);
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

{
  /* <a href="#" class="flex px-4 py-2 group">
<span class="pr-2 text hover:underline">Next page</span>
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
<a href="#" class="flex px-4 py-2 group">
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
<span class="pl-2 text hover:underline">Previous page or number?</span>
</a> */
}

// Object { isFirstPage: true, isLastPage: false, currentPage: 1, … }
// ​​
// currentPage: 1
// ​​
// isFirstPage: true
// ​​
// isLastPage: false
// ​​
// nextPage: 2
// ​​
// pageCount: 74
// ​​
// previousPage: null
// ​​
// totalCount: 441

// const pagination = function (data, parentContainer) {
const pagination = function (data) {
  let page = data.currentPage;
  console.log('currentPage', page);
  const ifFirstPage = data.isFirstPage;
  console.log(ifFirstPage);
  const ifLastPage = data.isLastPage;
  console.log(ifLastPage);
  const nextPage = data.nextPage;
  console.log(nextPage);
  const previousPage = data.previousPage;
  console.log(previousPage);
  if (ifFirstPage && ifLastPage) {
    // hide both arrows //
  }
  if (nextPage !== null) {
    // render  next arrow // show page number
  }
  if (previousPage !== null) {
    // render  previous arrow // show page number
  }
};

{
  const previousBtn = `
  <a href="#" class="flex px-4 py-2 group">
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
</a> `;

  const NextBtn = `<a href="#" class="flex px-4 py-2 group">
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
</a>`;
  const bothBtns = `
   <div class="flex justify-between px-8 pt-4 pb-8">
          <a href="#" class="flex px-4 py-2 group ${!previousPage ? 'hidden' : ''}">
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

          <a href="#" class="flex px-4 py-2 group ${!nextPagePage ? 'hidden' : ''}">
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
        </div>`;
}

import { readListings } from '../model/listings/readListings';
import { formatDateTime } from '../utilities/formatDateTime';
import { authGuard } from '../utilities/authGaurd';

export async function generateBidCards() {
  try {
    const data = await readListings();
    const listings = data.data;
    const parentContainer = document.querySelector('#live-auctions-container');
    // console.log(parentContainer);
    generateHtml(listings, parentContainer);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const generateHtml = function (listings, parentContainer) {
  listings.forEach((listing) => {
    const cards = createSingleBidCard(listing);
    parentContainer.insertAdjacentHTML('beforeend', cards);
  });

  document.querySelectorAll('[data-bid-button]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      const highestBid = e.target.closest('[data-highest-bid]').dataset.highestBid;

      if (authGuard()) {
        const bidAmount = prompt('Enter your bid amount. min bid amount is ' + (+highestBid + 1));
        const isValidBid = validateBid(bidAmount, highestBid);
        if (!isValidBid) return;
        const bid = bidAmount;
        console.log('bid:', bid);
        return listingId, bid;
      }
    });
  });

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      console.log('listingId:', listingId);
      localStorage.setItem('listingId', listingId);
      // window.location.href = '/biddings/single-listing/';
    });
  });
  // POST request to the backend to place the bid
};

export const createSingleBidCard = function (listing) {
  const card = `
  <div class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md" 
  data-listing-id="${listing.id}" data-tags="${listing.tags?.[0]?.substring(0, 2)}" 
  data-highest-bid='${listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}' ">
  <div class="w-full aspect-[4/3] overflow-hidden pb-2">
    <img
       src="${listing.media[0].url}"
      alt="${listing.media[0].alt}"
      class="w-full h-full object-cover"
    />
  </div>
  <p class="text-md font-semibold py-2">${listing.title}</p>
  <p>${listing.seller.name}</p>
  <div class="flex flex-col">
    <p class="text-xs text-left">Ends at ${formatDateTime(listing.endsAt)}</p>
    <p class="text-xs text-left">Highest current bid : ${listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : 'No bids yet'}</p>
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

import { list } from 'postcss';
import { readListings } from '../model/listings/readListings';
import { formatDateTime } from '../utilities/formatDateTime';

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
  // console.log('listings:', listings);
  listings.forEach((listing) => {
    const cards = createSingleBidCard(listing);
    parentContainer.insertAdjacentHTML('beforeend', cards);
    // document.querySelector('#bid-for-Listing').addEventListener('click', (e) => {
    //   e.preventDefault();
    //   console.log('I am the bid button');
    //   console.log('clicked');
    // });
  });
  //
  document.querySelectorAll('[data-bid-button]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('I am the bid button');
      console.log('clicked');
      console.log(e.target.closest('[data-listing-id]').dataset.listingId);
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      const highestBid = e.target.closest('[data-highest-bid]').dataset.highestBid;
      const bidAmount = prompt('Enter your bid amount. min bid amount is ' + (highestBid + 1));
      console.log('bidamount:', bidAmount);
      // verify that the number is a number and actully bigger than the highest bid
      // return the hightes bid
      // when number is 100 and highest bid is 101 why ?
      return listingId;
    });
  });
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

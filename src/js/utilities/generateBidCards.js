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
    //   const htmlContent = `<div class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md" data-listing-id="${listing.id}" tags-category="${listing.tags?.[0]?.substring(0, 2)}">
    //   <div class="w-full aspect-[4/3] overflow-hidden pb-2">
    //     <img
    //        src="${listing.media[0].url}"
    //       alt="${listing.media[0].alt}"
    //       class="w-full h-full object-cover"
    //     />
    //   </div>
    //   <p class="text-md font-semibold py-2">${listing.title}</p>
    //   <p>${listing.seller.name}</p>
    //   <div class="flex flex-col">
    //     <p class="text-xs text-left">Ends at ${formatDateTime(listing.endsAt)}</p>
    //     <p class="text-xs text-left">Highest current bid : ${listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : 'No bids yet'}</p>
    //   </div>
    //   <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2">
    //     Bid href
    //   </a>
    // </div> `;
    // console.log(listing[0]);
    // console.log(listing.tags?.slice(0, 2))
    // console.log(listing.tags?.[0]?.substring(0, 2));
    parentContainer.insertAdjacentHTML('beforeend', cards);
  });
};

export const createSingleBidCard = function (listing) {
  const card = `
  <div class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md" data-listing-id="${listing.id}" tags-category="${listing.tags?.[0]?.substring(0, 2)}">
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
  <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2"   id="bid-for-Listing" >
    Bid
  </a>`;
  return card;
};

import { readListings } from '../model/listings/readListings';
import { formatDateTime } from '../utilities/formatDateTime';
import { authGuard } from './authGuard';
import { bidOnListing } from '../model/listings/bid';
import { pagination } from '../utilities/pagination';

export async function generateBidCards() {
  try {
    const data = await readListings(12, 1, true);
    const listings = data.data;
    const parentContainer = document.querySelector('#live-auctions-container');

    if (!parentContainer) return;

    await generateHtml(listings, parentContainer);

    const btnsContainer = document.querySelector('#pagination-container');
    if (!btnsContainer) return;

    await pagination(data.meta, btnsContainer);
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
<div class="p-4 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md overflow-hidden"
    data-listing-id="${listing.id}"
    data-tags="${listing.tags?.[0]?.substring(0, 2)}"
    data-highest-bid='${listing?.bids?.length ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}'>
 
 <div class="w-full aspect-[4/3] overflow-hidden pb-2">
   <img src="${listing?.media[0]?.url || 'Image not found'}"
        alt="${listing?.media[0]?.alt || 'Alternative Text not found'}"
        class="w-full h-full object-cover" />
 </div>

 <p class="text-md font-semibold py-2 break-words whitespace-normal line-clamp-2">
   ${listing?.title}
 </p>

 <p class="break-words whitespace-normal line-clamp-2">
   ${listing?.seller?.name || 'Unknown'}
 </p>

 <div class="flex flex-col">
   <p class="text-xs text-left break-words whitespace-normal line-clamp-2">
     Ends at ${formatDateTime(listing?.endsAt || new Date())}
   </p>
   <p class="text-xs text-left break-words whitespace-normal line-clamp-2">
     Highest current bid : ${listing?.bids?.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1) || 1}
   </p>
 </div>

 <a href="#"
    class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2"
    id="bid-for-Listing"
    data-bid-button>
   Bid
 </a>
</div>
  `;
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
  return true;
};

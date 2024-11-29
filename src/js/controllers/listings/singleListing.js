import { initTabComponent } from '../../utilities/initTabComponent';
import { readListing } from '../../model/listings/readListings';
import { singleListingContainer } from '../../views/listings/single_listing';
import { createSingleListingCard } from '../../model/listings/singleListing';
import { list } from 'postcss';
//
import { addEventListenersToSingleListingCard } from '../../model/listings/singleListing';
import { tabComponentHeader } from '../../model/listings/singleListing';
import { authGuard } from '../../utilities/authGaurd';
import { validateBid } from '../../utilities/generateBidCards';
import { bidOnListing } from '../../model/listings/bid';
// import { generateHtml } from '../../utilities/generateBidCards';

async function renderHero() {
  const listingId = localStorage.getItem('listingId');
  const parentContainer = singleListingContainer;
  if (!parentContainer) {
    console.error('Container not found');
    return;
  }
  try {
    const response = await readListing(listingId);
    // console.log('Raw response:', response);
    const listing = response.data;

    // console.log(listing);

    const card = createSingleListingCard(listing);
    parentContainer.insertAdjacentHTML('afterbegin', card);
    //
    document.querySelector('[data-bid-button]').addEventListener('click', async (e) => {
      e.preventDefault();
      const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
      const highestBid = e.target.closest('[data-highest-bid]').dataset.highestBid;
      //
      if (authGuard()) {
        const bidAmount = prompt('Enter your bid amount. min bid amount is ' + (+highestBid + 1));
        const isValidBid = validateBid(bidAmount, highestBid);
        if (!isValidBid) return;
        const bid = {
          amount: Number(bidAmount),
        };
        console.log('bid:', bid);
        await bidOnListing(bid, listingId);
        window.location.reload();
      }
    });

    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
        console.log('listingId:', listingId);
        localStorage.setItem('listingId', listingId);
        window.location.href = '/biddings/single-listing/';
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function renderTabs() {
  //
}
async function main() {
  console.log('halo from the other side');
  await renderHero();
  initTabComponent();
  console.log('i am the controller one more time');
}
document.addEventListener('DOMContentLoaded', main());

const insertEventListeners = function () {
  //
};

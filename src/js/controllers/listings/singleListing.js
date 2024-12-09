import { initTabComponent } from '../../utilities/initTabComponent';
import { readListing } from '../../model/listings/readListings';
//
import { authGuard } from '../../utilities/authGuard';
import { validateBid } from '../../utilities/generateBidCards';
import { bidOnListing } from '../../model/listings/bid';
import {
  tabComponentOnSinglePage,
  singleListingContainer,
} from '../../views/listings/single_listing';

import {
  tabComponentHeader,
  createTabs1Content,
  createTabs2Content,
  createTabs3Content,
  createSingleListingCard,
} from '../../model/listings/singleListing';
import { initCarousel } from '../../model/listings/carousel';
export const checkSellerAndHideBtn = function () {
  const observer = new MutationObserver(() => {
    const bidBtn = document.querySelector('#bid-for-Listing-btn');

    if (!bidBtn) return;
    if (bidBtn) {
      const seller = document.querySelector('[data-seller-name]')?.dataset.sellerName;
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) return;
      const currentUser = user.name;
      if (!currentUser) return;

      const btnContainer = document.querySelector('#switchToCurrentUserEditBtn');

      if (currentUser === seller) {
        // bidBtn.style.display = 'none';
        bidBtn.remove();
        const html = `
            <a
            href="#"
            id="bid-for-Listing-btn"
            class="btn btn-secondary dark:btn-secondary-dark self-end"
            data-bid-button
          >
            Edit Listing
          </a>
          
             <a
            href="#"
            class="font-medium text-red-500 hover:underline self-end pl-4 delete-listing-btn"
            data-bid-button
          >
            Delete Listing
          </a>`;
        btnContainer.insertAdjacentHTML('beforeend', html);
      }

      observer.disconnect();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
async function renderHero() {
  const listingId = localStorage.getItem('listingId');
  const parentContainer = singleListingContainer;
  if (!parentContainer) {
    return;
  }
  try {
    const response = await readListing(listingId);
    const listing = response.data;
    const card = await createSingleListingCard(listing);
    if (!card) return;
    parentContainer.insertAdjacentHTML('afterbegin', card);

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
        await bidOnListing(bid, listingId);
        window.location.reload();
      }
    });

    checkSellerAndHideBtn();
  } catch (error) {
    throw error;
  }
}
//
async function renderTabs() {
  const listingId = localStorage.getItem('listingId');
  const parentContainer = tabComponentOnSinglePage;
  if (!parentContainer) {
    return false;
  }
  try {
    const response = await readListing(listingId);
    const listing = response.data;

    // console.log('listing:', listing.title);
    parentContainer.insertAdjacentHTML('beforeend', tabComponentHeader);
    parentContainer.insertAdjacentHTML('beforeend', await createTabs1Content(listing));
    parentContainer.insertAdjacentHTML('beforeend', await createTabs2Content(listing));
    parentContainer.insertAdjacentHTML('beforeend', await createTabs3Content(listing));

    initTabComponent();
    return true;
  } catch (error) {
    throw error;
  }
}
async function main() {
  try {
    await renderHero();
    await renderTabs();
    await initCarousel();
  } catch (error) {
    throw error;
  }
}
// document.addEventListener('DOMContentLoaded', async () => {
//   await main();
// });

main();

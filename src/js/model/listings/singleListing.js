import { formatDateTime } from '../../utilities/formatDateTime';

export const createSingleListingCard = function (listing) {
  const listingHtml = `
        <div
  data-listing-id="${listing?.id}"
  data-highest-bid="${listing?.bids?.length ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1}"
>
  <div class="aspect-[4/3] overflow-hidden flex justify-center items-center">
    <img
      src="${listing?.media?.[0]?.url}"
      alt="${listing?.media?.[0]?.alt}"
      class="w-full h-full object-contain rounded-lg"
    />
  </div>
  <div
    class="bg-light-cards dark:bg-purple-dark py-4 px-4 flex flex-col md:flex-row md:w-max-[50%] rounded-xl shadow-lg w-full h-auto justify-between"
  >
    <div class="space-y-2">
      <h5>${listing?.title}</h5>
      <p>Seller: ${listing?.seller?.name}</p>
      <p>Description: ${listing?.description}</p>
      <p>
        Current Price: ${
          listing?.bids?.length > 0 ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1
        }
      </p>
      <p>Ends at: ${formatDateTime(listing?.endsAt)}</p>
    </div>
    <div class="flex justify-end mt-auto">
      <a href="#" class="btn btn-secondary dark:btn-secondary-dark self-end" data-bid-button>
        Place bid
      </a>
    </div>
  </div>
</div>
      `;

  console.log('data-listing-id:', listing.id);
  return listingHtml;
};
// fix indentetion when done
// fix the styling of the card maybe flex 50/50

export function addEventListenersToSingleListingCard(listingId) {
  const placeBidBtn = document.querySelector('#bid-for-Listing');
  placeBidBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Place bid button clicked');
    console.log(e.target);
    // const listingId = e.currentTarget.closest('[data-listing-id]').dataset.listingId;
    // console.log('listingId:', listingId);
    // localStorage.setItem('listingId', listingId);
    // window.location.href = '/biddings/single-listing/';
  });
}
export const tabComponentHeader = function () {
  const html = `
  <div class="px-8 flex justify-center md:justify-start">
    <ul class="flex bg-light-cards dark:bg-purple-dark rounded-lg">
      <li
        id="tab-singleListingDetails"
        class="tab p-5 border-b-4 md:px-8 font-bold text-green-2 dark:text-blue-400 border-green-2 dark:border-blue-400 cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
      >
        Details
      </li>
      <li
        id="tab-singleListingBids"
        class="tab p-5 border-b-4 md:px-8 border-none cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
      >
        Bid history
      </li>
      <li
        id="tab-aboutSeller"
        class="tab p-5 border-b-4 md:px-8 border-none cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
      >
        About Seller
      </li>
    </ul>
  </div>;
  `;
};

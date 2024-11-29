import { formatDateTime } from '../../utilities/formatDateTime';

export const createSingleListingCard = function (listing) {
  const listingHtml = `
          <div class=" data-listing-id="${listing.id}" data-tags="${listing.tags?.[0]?.substring(0, 2)}" 
           data-highest-bid='${listing?.bids?.length ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}' ">
         <div class="aspect-[4/3] overflow-hidden">
         <img
         src="${listing?.media[0]?.url}"
         alt="${listing?.media[0]?.alt}"
        class="w-full h-auto object-cover rounded-lg"
         />
         </div>
          </div>
          <div
            class="bg-light-cards dark:bg-purple-dark py-4 px-4 flex flex-col md:flex-row md:w-max-[50%] rounded-xl shadow-lg w-full h-auto justify-between"
          >
            <div class="space-y-2">
              <h5>${listing?.title}</h5>
              <p>Seller :${listing?.seller.name}</p>
              <p>Description :${listing?.description}</p>
              <p>Current Price : ${listing?.bids?.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : Number(1)}</p>
              <p>Ends at : ${formatDateTime(listing?.endsAt)}</p>
            </div>
            <div class="flex justify-end mt-auto">
              <a href="#" class="btn btn-secondary dark:btn-secondary-dark self-end">Place bid</a>
            </div>
          </div>
      `;
  console.log('i am working here on generating');
  return listingHtml;
};
// fix indentetion when done

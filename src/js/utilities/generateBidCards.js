import { readListings } from '../model/listings/readListings';

export async function generateBidCards() {
  try {
    const data = await readListings();
    const listings = data.data;
    const parentContainer = document.querySelector('#live-auctions-container');
    console.log(parentContainer);
    generateHtml(listings, parentContainer);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const generateHtml = function (listings, parentContainer) {
  console.log('listings:', listings);
  listings.forEach((listing) => {
    const htmlContent = `<div class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md">
    <div class="flex max-w-md pb-2">
      <img
         src="${listing.media[0].url}"
        alt="${listing.media[0].alt}"
      />
    </div>
    <p class="text-md font-semibold py-2">${listing.title}</p>
    <p>${listing.seller.name}</p>
    <div class="flex flex-col">
      <p class="text-xs text-left">Ends at ${listing.endsAt}</p>
      <p class="text-xs text-left">Highest current ${listings.bids}</p>
    </div>
    <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2">
      Bid href
    </a>
  </div> `;
    console.log(listing);
    parentContainer.insertAdjacentHTML('beforeend', htmlContent);
  });
};

// {
// <div class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md">
//   <div class="flex max-w-md">
//     <img
//       src="https://images.pexels.com/photos/15282059/pexels-photo-15282059/free-photo-of-a-view-of-the-ocean-from-a-ferry.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       alt=""
//     />
//   </div>
//   <p class="text-sm py-2">title of the product .. might be fucking long</p>
//   <p>seller</p>

//   <div class="flex flex-col">
//     <p class="text-xs text-left">Ends in 2 days</p>
//     <p class="text-xs text-left">Highest current bid 100nok</p>
//   </div>
//   <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2">
//     Bid href
//   </a>
// </div>;
// }

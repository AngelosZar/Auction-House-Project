import { list } from 'postcss';
import { formatDateTime } from '../../utilities/formatDateTime';
import { readProfile } from '../profile/read';
export const createSingleListingCard = async function (listing) {
  const listingHtml = `
<div id="carousel-component" class="relative w-full" data-carousel="slider">
 <div class="relative h-56 min-h-[240px] overflow-hidden rounded-lg md:h-96 max-w-xl" id="carousel-component">
   
   <div class="duration-700 ease-in-out" data-carousel="slide">
     <img
       src="https://images.pexels.com/photos/27798074/pexels-photo-27798074/free-photo-of-faroe-islands-6.jpeg"
       alt="Faroe Islands"
       class="absolute block w-full object-cover"
     />
   </div>

   <div class="hidden duration-700 ease-in-out" data-carousel="slide">
     <img
       src="https://images.pexels.com/photos/17785619/pexels-photo-17785619/free-photo-of-arch-on-a-street-in-pisa.jpeg"
       alt="Pisa Street Arch" 
       class="absolute block w-full object-cover"
     />
   </div>

   <div class="hidden duration-700 ease-in-out" data-carousel="slide">
     <img
       src="https://images.unsplash.com/photo-1719339837808-8f4a7d3b7096"
       alt="Landscape"
       class="absolute block w-full object-cover"
     />
   </div>

   <button
     id="carousel-btn-previous"
     type="button"
     class="absolute top-10 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
     data-carousel-prev
   >
     <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-3 dark:bg-blue-dark">
       &laquo;
     </span>
   </button>

   <button
     id="carousel-btn-next" 
     type="button"
     class="absolute top-10 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
     data-carousel-next
   >
     <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-3 dark:bg-blue-dark">
       &raquo;
     </span>
   </button>

   <div
     id="carousel-dots"
     class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
   ></div>

 </div>
</div>
<div
  data-listing-id="${listing?.id}"
  data-highest-bid="${listing?.bids?.length ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1}"
  data-seller-name="${listing.seller.name}"
  class="grid grid-cols-1 md:grid-cols-2 md:py-8 gap-8 pt-16 pb-20 px-4"
>

  <div
    class="bg-light-cards dark:bg-purple-dark py-4 px-4 flex flex-col md:flex-row rounded-xl shadow-lg w-full h-auto justify-between"
  >
    <div class="space-y-2  flex flex-col">
      <div class="mb-2">
        <h5 class="mb-4 semi-bold">${listing?.title || 'Untitled Listing'}</h5>
        <p class="mb-2" >Seller: ${listing?.seller?.name || 'Unknown'}</p>
        <p class="mb-2" >Description: ${listing?.description || 'No description provided.'}</p>
        <p class="mb-2" >
          Current Price: ${
            listing?.bids?.length > 0 ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1
          }
        </p>
        <p class="mb-2" >Ends at: ${formatDateTime(listing?.endsAt || new Date())}</p>
      </div>

      <span class="mt-4 justify-end align-bottom" id="switchToCurrentUserEditBtn" data-listing-buttons>
        <a
          href="#"
          id="bid-for-Listing-btn"
          class="btn btn-secondary dark:btn-secondary-dark self-end"
          data-bid-button
        >
          Place bid
        </a>
      </span>
    </div>
  </div>
</div>
`;
  return listingHtml;
};

export const tabComponentHeader = `
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
  </div>
  `;
//
export async function createTabs1Content(listing) {
  return `
<div
  class="tab-content hidden w-full  mt-8 px-8 justify-center md:justify-start"
  id="singleListingDetails"
>
  <section
    class="grid grid-flow-row w-full justify-center md:max-w-2xl "
  >
    <div
      class="bg-light-cards dark:bg-purple-dark p-6 border-2 border-green-3 rounded-xl dark:border-purple-dark shadow-xl"
    >
      <h5 class="mb-4 semi-bold text-green-2 dark:text-blue-400">
        ${listing?.title || 'Untitled Listing'}
      </h5>
      <p class="mb-2">
        <span class="font-semibold text-lg text-green-2 dark:text-blue-400">Seller:</span>
        ${listing?.seller?.name || 'Unknown'}
      </p>
      <p class="mb-2">
        <span class="font-semibold text-lg text-green-2 dark:text-blue-400">Description:</span>
        ${listing?.description || 'No description provided.'}
      </p>
      <p class="mb-2">
        <span class="font-semibold text-lg text-green-2 dark:text-blue-400">Current Price:</span
        >Current Price: ${
          listing?.bids?.length > 0 ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1
        }
      </p>
      <p class="mb-2">
        <span class="font-semibold text-lg text-green-2 dark:text-blue-400">Ends at:</span>
        ${formatDateTime(listing?.endsAt || new Date())}
      </p>
    </div>
  </section>
</div>
`;
}

/** ...
 * Creates HTML content for a tab displaying bid history and listing details
 * @param {Promise  to Object} listing
 * @returns {object} HTML object
 * @bidHistory {Array} listing.bids - array of bids sorted from highest to lowest with a limit of 5
 * @highestBids {Array} bidHistory - array of bids sorted from lowest to highest from bidHistory for rendering
 * returns HTML content for the bid history tab
 * Creates HTML content for a tab displaying bid history and listing details
 *  * @throws {error} error - when data is not found
 */
export async function createTabs2Content(listing) {
  try {
    const data = await listing;
    const bids = data.bids;

    if (!listing) throw new Error('Data not found');

    const bidHistory = bids.sort((a, b) => b.amount - a.amount).slice(0, 5);
    const highestBids = bidHistory.sort((b, a) => b.amount - a.amount);

    if (!data.bids || !Array.isArray(data.bids)) {
      throw new Error('No bids found');
    }
    return `
   
  <div class="tab-content  hidden mt-8 px-8 max-w-2xl bg-light-cards dark:bg-purple-dark p-4 m-8 rounded-xl" id="singleListingBids">
    <p class="font-semibold text-green-2 text-xl dark:text-blue-400 pb-4">
      Listing was created: ${formatDateTime(data.created)}
    </p>
    <p class="font-semibold text-green-2 text-xl dark:text-blue-400">
      Auction ends at: ${formatDateTime(data.endsAt)}
    </p>

    ${highestBids
      .map(
        (bid) => `
    <p class="mb-2 mt-4">🟢 ${bid?.bidder?.name}: ${bid?.amount}</p>
    `
      )
      .join('')}
  </div>

  `;
  } catch (error) {
    // console.log(error);
  }
}
export async function createTabs3Content(listing) {
  try {
    const seller = listing.seller.name;
    const response = await readProfile(seller);
    const profile = response.data;
    if (profile === null) {
      throw new Error('Profile not found');
    }
    return `<div class="tab-content max-w-3xl hidden mt-8 px-8 md:px-0" id="aboutSeller">
    <section class="flex">
      <div
        class="w-full max-w-2xl mx-auto m-5 px-5 py-10 sm:m-10 sm:p-10 md:px-20 md:py-10 bg-light-cards dark:bg-purple-dark rounded-lg shadow-xl"
      >
      <div class="">
         <img src="${profile.banner?.url}" alt="${profile.banner?.alt}" />
      </div>
        <div
          class="flex border-2  flex-col  md:flex-row rounded-xl border-green-2 dark:border-purple-dark px-2 py-4 justify-center max-w-[550px] h-auto bg-light-cards dark:bg-blue-dark shadow-lg"
        >
          <div>
            <img
              src="${profile.avatar?.url || ''}"
              alt="${profile.avatar?.alt || 'users avatar img'}"
              class="w-28 h-28 md:w-36 md:h-36 rounded-full mr-4"
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="mb-2 text-xl font-semibold">${profile.name}</p>
            <p>Credits :${profile.credits} </p>
             <p>Listed items:${profile._count?.listings} </p>
             <p>Wins :${profile._count.wins} </p>
          </div>
        </div>
      </div>
    </section>
  </div>
`;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

{
  /* <div>
<button
  id="carousel-btn-previous"
  type="button "
  class="absolute top-10 end-10 start-0 z-30 flex-items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  data-carousel-prev
>
  <span
    class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-3 dark:bg-blue-dark"
    >&laquo;
  </span>
</button>

<button
  id="carousel-btn-next"
  type="button "
  class="absolute top-10 end-0 start-10 z-30  px-4 cursor-pointer group focus:outline-none"
  data-carousel-prev
>
  <span
    class="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-blue-dark"
    >&raquo;
  </span>
</button>
<div
  id="carousel-dots"
  class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
></div>
</div> */
}

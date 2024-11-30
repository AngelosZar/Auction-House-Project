import { formatDateTime } from '../../utilities/formatDateTime';

export const createSingleListingCard = function (listing) {
  const listingHtml = `
<div
  data-listing-id="${listing?.id}"
  data-highest-bid="${listing?.bids?.length ? Math.max(...listing?.bids?.map((bid) => bid.amount)) : 1}"
  class="grid grid-cols-1 md:grid-cols-2 md:py-8 gap-8 pt-16 pb-20 px-4"
>
  <div class="aspect-[4/3] overflow-hidden flex justify-center items-center">
    <img
      src="${listing?.media?.[0]?.url || ''}"
      alt="${listing?.media?.[0]?.alt || 'Image of the listing'}"
      class="w-full h-full object-cover rounded-lg"
    />
  </div>

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

      <span class="mt-4 justify-end align-bottom">
        <a
          href="#"
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

  console.log('data-listing-id:', listing.id);
  return listingHtml;
};

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

export async function createTabsContent(html) {
  return html;
}
//
const tab1 = `<div
class="tab-content w-full block mt-8 px-8 justify-center md:justify-start"
id="singleListingDetails"
>
<section
  class="grid col-span-1 gap-6 grid-flow-row w-full justify-center md:justify-start md:grid-cols-2 lg:grid-cols-3"
>
  <div
    class="bg-light-cards dark:bg-purple-dark p-6 border-2 border-green-3 rounded-xl dark:border-purple-dark shadow-xl"
  >
    <h6 class="mb-4">About : product title</h6>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged.
    </p>
  </div>
</section>
</div>`;
//
const tab2 = `
  <div class="tab-content max-w-3xl hidden mt-8 px-8" id="singleListingBids">
          <section class="">
            <h6 class="mb-4">history about listing</h6>
            <p>🟢 user name bid : amount</p>
            <p>🟢 user name bid : amount</p>
            <p>🟢 user name bid : amount</p>
            <p>🟢 user name bid : amount</p>
            <p>🟢 user name bid : amount</p>
            <p>🟢 user name bid : amount</p>
          </section>
  </div>
`;
//
const tab3 = `
<div class="tab-content max-w-3xl hidden mt-8 px-8 md:px-0" id="aboutSeller">
          <section class="flex">
            <div
              class="max-w-xl mx-auto m-5 px-5 py-10 sm:m-10 sm:p-10 md:px-20 md:py-10 bg-light-cards dark:bg-purple-dark rounded-lg shadow-xl"
            >
              <h5 class="font-bold mb-4 md:text-5xl md:mb-10 dark:text-white text-center">
                info about seller
              </h5>
              <div
                class="flex border-2 rounded-xl border-green-2 dark:border-purple-dark px-2 py-4 justify-center max-w-[550px] h-auto bg-light-cards dark:bg-blue-dark shadow-lg"
              >
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1561084746-f360502e5abe?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGF1Y3Rpb24lMjBzdGF0dWV8ZW58MHx8MHx8fDA%3D"
                    alt=""
                    class="w-20 h-20 rounded-full mr-4"
                  />
                </div>
                <div class="flex flex-col justify-center">
                  <p class="mb-2 text-xl font-semibold">Ola Scandiman</p>
                  <p>1000point// wins</p>
                </div>
              </div>
            </div>
          </section>
        </div>
`;
//

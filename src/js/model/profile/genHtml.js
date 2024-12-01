import { readProfileListings } from './read';
export const genHtmlProfileHero = async function (currentUser) {
  return `
   <div class="lg:mb-18 relative mb-8 max-w-screen-2xl xs:mb-12 md:mb-14 lg:mb-20">
          <img
            alt="Profile Banner"
            class="h-[15vh] w-full object-cover md:h-[20vh] lg:h-[30vh]"
            src="${currentUser.avatar?.url}"
          />
          <img
            alt="User Avatar"
            class="avatar-img top xs:left-6md:-bottom-14 absolute -bottom-5 left-4 h-20 w-20 rounded-full xs:-bottom-12 xs:h-28 xs:w-28 md:left-8 md:h-36 md:w-36 lg:-bottom-16 lg:left-10 lg:h-44 lg:w-44 xl:-bottom-20 xl:h-52 xl:w-52"
            src="${currentUser.banner?.url}"
          />
        </div>
        <div class="mx-6 xl:mx-12 self-end">
          <h5 class="font-semibold text-green-2 dark:text-purple-light pb-2" >${currentUser.name}</h5>
          <p class="pb-1" >Verified user ✌️</p>
          <p class="pb-1" >Credit Points: ${currentUser.credits}</p>
          <a
            href="../profile/update/"
            class="btn btn-secondary dark:btn btn-secondary-dark pt-2"
            id="editProfile"
            >Edit profile</a
          >
        </div>`;
};

export const renderProfileTabHeader = function () {
  return `
<div class="px-8 flex justify-center md:justify-start">
          <ul class="flex bg-light-cards dark:bg-purple-dark rounded-lg">
            <li
              id="tab-user-listings"
              class="tab p-5 border-b-4 md:px-8 font-bold text-green-2 dark:text-blue-400 border-green-2 dark:border-blue-400 cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
            >
              My listings
            </li>
            <li
              id="tab-users-bids"
              class="tab p-5 border-b-4 md:px-8 border-none cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
            >
              My bids
            </li>
            <li
              id="tab-create-listing"
              class="tab p-5 border-b-4 md:px-8 border-none cursor-pointer bg-light-cards dark:bg-purple-dark rounded-lg"
            >
              Create listing
            </li>
          </ul>
</div>
`;
};

export const renderProfileTab1Content = async function (currentUser, cardNumber, page) {
  try {
    const userData = await readProfileListings(currentUser.name, cardNumber, page);
    console.log(userData);
    const cards = userData.data
      .map((listing) => {
        console.log('listing:', listing);
        return `
        <div
          id="card-${listing.id}"
          class="p-6 border bg-light-cards rounded-lg border-gray-400 dark:border-purple-dark dark:bg-blue-dark max-w-md h-full flex flex-col justify-between shadow-md"
        >
          <div class="flex max-w-md">
            <img
              src="${listing.media?.[0]?.url}"
              alt="${listing.media?.[0]?.alt}"
            />
          </div>
          <p class="text-lg font-semibold py-2">${listing.title}</p>
          <p class="text-sm pb-2" >${listing.description}</p>
          <div class="flex flex-col">
            <p class="text-xs text-left">Created ${listing.created}</p>
            <p class="text-xs text-left">Ends in: ${listing.endsAt}</p>
            <p class="text-xs text-left">Highest current bid ${listing.highestBid || 0} nok</p>
          </div>
          <a href="#" class="btn btn-secondary dark:btn-secondary-dark text-xs self-end mt-2">
            Edit listing
          </a>
        </div>
      `;
      })
      .join('');

    return `
    <div
      class="tab-content w-full block mt-8 px-8 justify-center md:justify-start"
      id="user-listings"
    >
      <section
        class="grid col-span-1 gap-6 grid-flow-row w-full justify-center md:justify-start md:grid-cols-2 lg:grid-cols-3"
      >
        ${cards}
      </section>
    </div>
    
  `;
  } catch (error) {
    console.error(error);
  }
};

export const renderProfileTab2Content = async function () {
  return `
   <div class="tab-content max-w-3xl hidden mt-8 px-8" id="users-bids">
          <section class="">
            <div>this will be card one-users-bid</div>
            <div>this will be card two-users-bid</div>
            <div>this will be card three-users-bid</div>
            <button>Pagination to view more</button>
          </section>
        </div>
    `;
  //
};
export const renderProfileTab3Content = async function () {
  return `
   <div class="tab-content max-w-3xl hidden mt-8 px-8 md:px-0" id="create-listing">
          <section class="min-h-screen">
            <div
              class="max-w-xl mx-auto m-5 px-5 py-10 sm:m-10 sm:p-10 md:px-20 md:py-10 bg-light-cards dark:bg-purple-dark rounded-lg shadow-xl"
            >
              <h5 class="font-bold mb-4 md:text-5xl md:mb-10 dark:text-white text-center">
                List a new item
              </h5>
      
              <form action="">
                <div class="mb-2">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    class="input-forms mt-1"
                    required
                    placeholder="Title of the product"
                  />
                </div>
                <div>
                  <label for="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="10"
                    rows="5"
                    class="input-forms mt-1"
                    maxlength="120"
                    placeholder="Max 120 characters"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label for="category" class="relative">Category</label>
               
                  <select name="category" id="category" class="input-forms mt-1" required>
                  
                    <option value="0">Select Category</option>
                    <option value="1">Electronics</option>
                    <option value="2">Home & Garden</option>
                    <option value="3">Fashion & Accessories</option>
                    <option value="4">Collectibles</option>
                    <option value="5">Art & Antiques</option>
                    <option value="6">Vehicles & Parts5</option>
                    <option value="7">Sports & Outdoors</option>
                    <option value="8">Toys & Hobbies</option>
                    <option value="9">Books, Music & Movies</option>
                    <option value="10">Industrial & Business</option>
                    <option value="11">None of the above</option>
                  </select>
                </div>
                <div class="mb-2">
                  <label for="end-auction-date">End auction at</label>
                  <input
                    type="date"
                    name="end-auction-date"
                    id="end-auction-date"
                    class="input-forms mt-1"
                    required
                  />
                </div>
         
                <div class="mb-2">
                  <label for="starting-price">Starting price</label>
                  <input
                    type="number"
                    name="starting-price"
                    id="starting-price"
                    class="input-forms mt-1"
                    required
                    min="20"
                    placeholder="Minimum Bid starts at 20NOK"
                  />
                </div>
                <div class="mb-2">
                  <label for="image">Image</label>
                  <input
                    type="url"
                    name="image"
                    id="image"
                    class="input-forms mt-1"
                    required
                    placeholder="Only valid url"
                    pattern="https://.*"
                  />
             
                </div>
                <button class="btn btn-primary dark:btn-primary-dark" type="submit">Submit</button>
              </form>
            </div>
          </section>
        </div>
 `;
};

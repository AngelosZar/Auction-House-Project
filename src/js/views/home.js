export const exploreNowBtn = document.querySelector('#explore-now-btn');
export const startBiddingBtn = document.querySelector('#start-bidding-btn');
export const createAnAddBtn = document.querySelector('#create-an-add-btn');
export const sellerSection = document.querySelector('#top-sellers-container');

//
export const createSingleCardOfUser = function (user) {
  const html = `
  <div class="flex border-2 rounded-xl border-grey-400 dark:border-purple-dark px-2 py-8 justify-space-around w-full h-full bg-light-cards dark:bg-blue-dark shadow-lg max-w-md">
  <div class="flex items-center ">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      data-src="${user?.avatar?.url || 'Avatar not found'}"
      alt="${user?.avatar?.alt || 'Alternative text not found'}"
      class="w-24 h-24 rounded-full mr-4 object-cover lazy-image"
    />
  </div>
  <div class="w-2/3 flex flex-col justify-center pl-4 align self-end">
    <p class="mb-2 text-xl font-semibold">${
      (user?.name || 'username not found').length > 12
        ? (user?.name || 'username not found').slice(0, 12) + '...'
        : user?.name || 'username not found'
    }
    </p>
    <p><span class="font-semibold text-md text-green-2 dark:text-blue-400">Credit Points:</span> ${user?.credits || ''}</p>
    <p><span class="font-semibold text-md text-green-2 dark:text-blue-400">User listed:</span> ${user?._count.listings || 0}</p>
     <p><span class="font-semibold text-md text-green-2 dark:text-blue-400">User wins:</span> ${user?._count.wins || 0}</p>  
  </div>
</div>
`;
  return html;
};

//

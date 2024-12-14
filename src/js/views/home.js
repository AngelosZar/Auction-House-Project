export const exploreNowBtn = document.querySelector('#explore-now-btn');
export const startBiddingBtn = document.querySelector('#start-bidding-btn');
export const createAnAddBtn = document.querySelector('#create-an-add-btn');
export const sellerSection = document.querySelector('#top-sellers-container');

//
export const createSingleCardOfUser = function (user) {
  const html = `
  <div class="flex border-2 rounded-xl border-green-2 dark:border-purple-dark px-2 py-4 justify-center max-w-[500px] h-auto bg-light-cards dark:bg-blue-dark shadow-lg">
  <div>
    <img
      src="${user.avatar.url}"
      alt="${user.avatar.alt}"
      class="w-20 h-20 rounded-full mr-4"
    />
  </div>
  <div class="flex flex-col justify-center">
    <p class="mb-2 text-xl font-semibold">${user.name}</p>
    <p>Credit Points: ${user.credits}</p>
    <p>User listed: ${user._count.listings}</p>
    <p>User wins: ${user._count.wins}</p>
   
  </div>
</div>
`;
  return html;
};

//

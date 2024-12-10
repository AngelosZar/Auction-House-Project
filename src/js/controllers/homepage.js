import { generateBidCards, initPaginationObserver } from '../utilities/generateBidCards';
import { exploreNowBtn, startBiddingBtn, createAnAddBtn } from '../views/home';
import { authGuard } from '../utilities/authGuard';
//
//
//
const handleExploreNowBtn = (e) => {
  e.preventDefault();
  console.log(e.target);
  // authGuard();
};
//
const handleStartBiddingBtn = (e) => {
  e.preventDefault();
  console.log(e.target);
  authGuard();
};
//
const handleCreateAnAddBtn = (e) => {
  e.preventDefault();
  authGuard();
  window.location.href = '/profile/?action=create/';
};
// const initHomepage = async () => {
//   try {
//     await generateBidCards();

//     exploreNowBtn.addEventListener('click', handleExploreNowBtn);
//     startBiddingBtn.addEventListener('click', handleStartBiddingBtn);
//     createAnAddBtn.addEventListener('click', handleCreateAnAddBtn);
//     //
//     const initPagination = function () {
//       const paginationContainer = document.querySelector('#pagination-container');
//       if (paginationContainer && paginationContainer.children.length > 0) {
//         const cleanup = initPaginationObserver();
//         window.paginationCleanup = cleanup;
//       } else {
//         setTimeout(initPagination, 50);
//       }
//     };
//     initPagination();
//   } catch (error) {
//     console.log(error);
//   }

//   //
//   const paginationContainer = document.querySelector('#pagination-container');
//   if (paginationContainer) initPaginationObserver();
// };
// initHomepage();
const initHomepage = async () => {
  try {
    console.log('Starting homepage initialization');

    await generateBidCards();
    console.log('Bid cards generated');

    exploreNowBtn.addEventListener('click', handleExploreNowBtn);
    startBiddingBtn.addEventListener('click', handleStartBiddingBtn);
    createAnAddBtn.addEventListener('click', handleCreateAnAddBtn);

    const initPagination = function () {
      console.log('Checking for pagination container');
      const paginationContainer = document.querySelector('#pagination-container');

      if (paginationContainer) {
        console.log('Found container:', paginationContainer);
        console.log('Children length:', paginationContainer.children.length);
      }

      if (paginationContainer && paginationContainer.children.length > 0) {
        console.log('Initializing pagination observer');
        const cleanup = initPaginationObserver();
        window.paginationCleanup = cleanup;
      } else {
        console.log('Container not ready, retrying...');
        setTimeout(initPagination, 50);
      }
    };

    // Start the pagination initialization process
    console.log('Starting pagination initialization');
    initPagination();
  } catch (error) {
    console.error('Error in homepage initialization:', error);
  }
};

// Ensure DOM is loaded before running
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomepage);
} else {
  initHomepage();
}

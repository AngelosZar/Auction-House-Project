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
const initHomepage = async () => {
  try {
    await generateBidCards();

    exploreNowBtn.addEventListener('click', handleExploreNowBtn);
    startBiddingBtn.addEventListener('click', handleStartBiddingBtn);
    createAnAddBtn.addEventListener('click', handleCreateAnAddBtn);
    //
    const initPagination = function () {
      const paginationContainer = document.querySelector('#pagination-container');
      if (paginationContainer && paginationContainer.children.length > 0) {
        const cleanup = initPaginationObserver();
        window.paginationCleanup = cleanup;
      } else {
        setTimeout(initPagination, 50);
      }
    };
    initPagination();
  } catch (error) {
    console.log(error);
  }

  //
  const paginationContainer = document.querySelector('#pagination-container');
  if (paginationContainer) initPaginationObserver();
};
initHomepage();

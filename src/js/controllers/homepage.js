import { generateBidCards } from '../utilities/generateBidCards';
import { exploreNowBtn, startBiddingBtn, createAnAddBtn } from '../views/home';
import { authGuard } from '../utilities/authGuard';
import { initPaginationObserver } from '../utilities/pagination';
import { addMultipleEvents } from '../utilities/addMultipleEvents';
import { renderProfileCards } from '../controllers/profileCards';
import { initSpinner, terminateSpinner } from '../utilities/spinner';
const handleExploreNowBtn = (e) => {
  e.preventDefault();
  const targetContainer = document.querySelector('#section-2');
  window.scrollTo({
    behavior: 'smooth',
    top: targetContainer.offsetTop,
  });
};

const handleStartBiddingBtn = (e) => {
  e.preventDefault();
  if (!authGuard()) return;
  window.location.href = '/profile/?action=biddings/';
};

const handleCreateAnAddBtn = (e) => {
  e.preventDefault();
  if (!authGuard()) return;
  window.location.href = '/profile/?action=create/';
};
const initHomepage = async () => {
  const spinner = document.querySelector('.spinnerContainer');
  initSpinner(spinner);
  try {
    await generateBidCards();
    await renderProfileCards();
    let exploreNow = addMultipleEvents(exploreNowBtn, ['click', 'touchstart'], handleExploreNowBtn);
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
  } finally {
    terminateSpinner(spinner);
  }
};
initHomepage();

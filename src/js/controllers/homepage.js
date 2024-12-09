import { generateBidCards } from '../utilities/generateBidCards';
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
  await generateBidCards();
  exploreNowBtn.addEventListener('click', handleExploreNowBtn);
  startBiddingBtn.addEventListener('click', handleStartBiddingBtn);
  createAnAddBtn.addEventListener('click', handleCreateAnAddBtn);
};
initHomepage();

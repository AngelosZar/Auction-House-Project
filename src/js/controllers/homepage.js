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
  console.log(e.target);
  authGuard();
  window.location.href = '/profile/?action=create';
  // window.location.href = '/profile/';
  // window.addEventListener('load', () => {
  //   console.log('Profile page loaded');
  //   // setInterval(() => {
  //   //   document.querySelector('#tab-create-listing').click();
  //   // }, 2000);
  //   // setInterval(() => {
  //   //   document.querySelector('#user-listings').classList.add('hidden');
  //   //   document.querySelector('#create-listing').classList.add('block');
  //   // }, 1000);
  //   // document.querySelector('tab-create-listing').click();
  // });
};
const initHomepage = async () => {
  await generateBidCards();
  exploreNowBtn.addEventListener('click', handleExploreNowBtn);
  startBiddingBtn.addEventListener('click', handleStartBiddingBtn);
  createAnAddBtn.addEventListener('click', handleCreateAnAddBtn);
};
initHomepage();

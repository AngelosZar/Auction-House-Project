import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
//
import { testReadListings } from './js/model/listings/readListings';
import { createListing } from './js/model/listings/create';
import { updateListing } from './js/model/listings/update';
import { readListing } from './js/model/listings/readListings';
import { deleteListing } from './js/model/listings/delete';
import { bidOnListing } from './js/model/listings/bid';
import { searchListings, searchProfiles } from './js/model/listings/search';
//
// const testData = {
//   title: 'test',
//   description: 'test PUT requet on this damn laptop, finally success',
//   tags: ['electronics'],
//   media: [
//     {
//       url: 'https://images.unsplash.com/photo-1518448828347-28e2cf0d6e28?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       alt: 'laptop',
//     },
//   ],
//   endsAt: '2024-12-26T20:50:21.899Z',
// };
window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  document.getElementById('logOutBtn').addEventListener('click', logOut);
});
// await testReadListings();
const bid = {
  amount: 20, // Required
};
// const id = 'aff4808b-2a2f-429d-80b0-55cc5668f20d';
// console.log(id);
// await createListing(testData);
// await readListing(id);
// await deleteListing(id);
// await updateListing(testData, id);
// await bidOnListing(bid, id);
// await searchListings('macbook');
await searchProfiles('kim');

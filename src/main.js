import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
//
import { testReadListings } from './js/model/listings/readListings';
import { createListing } from './js/model/listings/create';
import { updateListing } from './js/model/listings/update';
import { readListing } from './js/model/listings/readListings';
import { deleteListing } from './js/model/listings/delete';
//
const testData = {
  title: 'test',
  description: 'test PUT requet on this damn laptop, finally success',
  tags: ['electronics'],
  media: [
    {
      url: 'https://images.unsplash.com/photo-1518448828347-28e2cf0d6e28?q=80&w=1436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'laptop',
    },
  ],
  endsAt: '2024-12-26T20:50:21.899Z',
};
window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  document.getElementById('logOutBtn').addEventListener('click', logOut);
});
// await testReadListings();
const id = '2176cc01-bc8f-4cd2-92d9-9cb3d84415a7';
// await readListing(id);
await deleteListing(id);
// await updateListing(testData, id);

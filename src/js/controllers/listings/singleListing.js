import { initTabComponent } from '../../utilities/initTabComponent';
import { readListing } from '../../model/listings/readListings';
import { singleListingContainer } from '../../views/listings/single_listing';
import { createSingleListingCard } from '../../model/listings/singleListing';
import { list } from 'postcss';
// import { generateHtml } from '../../utilities/generateBidCards';

async function renderHero() {
  const listingId = localStorage.getItem('listingId');
  const parentContainer = singleListingContainer;
  if (!parentContainer) {
    console.error('Container not found');
    return;
  }
  try {
    const response = await readListing(listingId);
    // console.log('Raw response:', response);
    const listing = response.data;
    console.log(listing);

    const card = createSingleListingCard(listing);
    parentContainer.insertAdjacentHTML('afterbegin', card);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function main() {
  console.log('halo from the other side');
  await renderHero();
  initTabComponent();
  console.log('i am the controller one more time');
}
document.addEventListener('DOMContentLoaded', main());

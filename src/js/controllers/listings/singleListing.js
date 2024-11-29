import { initTabComponent } from '../../utilities/initTabComponent';
import { renderSingleListing } from '../../model/listings/singleListing';

async function main() {
  console.log('halo from the other side');
  console.log('i am the controller one more time');
  initTabComponent();
  await renderSingleListing();
}
document.addEventListener('DOMContentLoaded', main());

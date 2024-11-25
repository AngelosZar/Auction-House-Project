import { readProfileHandler } from '../../controllers/profile/read';
import { initTabComponent } from '../../utilities/initTabComponent';

const profilePage = async function () {
  console.log('I am in the profile page');
  initTabComponent();
  // await readProfileHandler();
};

await profilePage();

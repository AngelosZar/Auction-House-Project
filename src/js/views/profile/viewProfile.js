import { readProfileHandler } from '../../controllers/profile/read';
const profilePage = async function () {
  console.log('I am in the profile page');
  await readProfileHandler();
};

// await profilePage();

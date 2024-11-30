import {
  readProfile,
  readProfiles,
  readProfileBids,
  readProfileListings,
  readProfileWins,
} from '../../model/profile/read';
import { genHtmlProfileHero } from '../../model/profile/genHtml';
import { returnToken } from '../../utilities/returnToken';
import { initTabComponent } from '../../utilities/initTabComponent';
import { authGuard } from '../../utilities/authGuard';
import { profileBannerContainer } from '../../views/profile/viewProfile';

export async function renderProfileHero() {
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    const data = await readProfile(username);
    const currentUser = data.data;
    const parentContainer = profileBannerContainer;
    console.log(currentUser);
    profileBannerContainer.insertAdjacentHTML('beforeend', await genHtmlProfileHero(currentUser));
  } catch (error) {
    console.log(error);
  }
  // await readProfile();
  // await readProfiles();
  // await readProfile('zzz');
  // returnToken();
  // await readProfileListings('');
  // const accessToken = returnToken();
  // console.log(accessToken);
}

const profilePage = async function () {
  console.log('I am in the profile page');
  renderProfileHero();
  initTabComponent();
  // await readProfileHandler();
};

await profilePage();

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
import { profileBannerContainer, tabComponentOnProfile } from '../../views/profile/viewProfile';
import {
  renderProfileTabHeader,
  renderProfileTab1Content,
  renderProfileTab2Content,
  renderProfileTab3Content,
} from '../../model/profile/genHtml';
import { createListingForm } from '../../views/profile/viewProfile';

export async function renderProfileHero() {
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    const data = await readProfile(username);
    const currentUser = data.data;
    console.log(currentUser);
    profileBannerContainer.insertAdjacentHTML('beforeend', await genHtmlProfileHero(currentUser));
    tabComponentOnProfile.insertAdjacentHTML('beforeend', renderProfileTabHeader());
    const [tab1Content, tab2Content, tab3Content] = await Promise.all([
      renderProfileTab1Content(currentUser, 6, 1),
      renderProfileTab2Content(currentUser, 6, 1),
      renderProfileTab3Content(),
    ]);

    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab1Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab2Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab3Content);

    initTabComponent();
  } catch (error) {
    console.log(error);
  }
}

const profilePage = async function () {
  console.log('I am in the profile page');
  renderProfileHero();
  await initTabComponent();
};

await profilePage();

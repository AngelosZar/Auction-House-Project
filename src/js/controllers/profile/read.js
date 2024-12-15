import { readProfile } from '../../model/profile/read';

import { initTabComponent } from '../../utilities/initTabComponent';
import { authGuard } from '../../utilities/authGuard';
import { profileBannerContainer, tabComponentOnProfile } from '../../views/profile/viewProfile';
import { initImgsObserver, initAddImgBtnObserver } from '../profile/observers';
import { genHtmlProfileHero } from '../../views/profile/viewProfile';
import {
  renderProfileTabHeader,
  renderProfileTab1Content,
  renderProfileTab2Content,
  renderProfileTab3Content,
} from '../../views/profile/tabComponent';

export async function renderProfilePage() {
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    const data = await readProfile(username);
    const currentUser = data.data;
    profileBannerContainer.insertAdjacentHTML('beforeend', await genHtmlProfileHero(currentUser));
    tabComponentOnProfile.insertAdjacentHTML('beforeend', renderProfileTabHeader());
    const [tab1Content, tab2Content, tab3Content] = await Promise.all([
      renderProfileTab1Content(currentUser, 12, 1),
      renderProfileTab2Content(currentUser, 12, 1),
      renderProfileTab3Content(),
      await initObservers(),
    ]);

    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab1Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab2Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab3Content);
    initTabComponent();
  } catch (error) {}
}

const initObservers = async function () {
  try {
    initImgsObserver();
    initAddImgBtnObserver();
  } catch (error) {
    throw new error(error);
  }
};

const init = async function () {
  await renderProfilePage();
  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'create/') {
    document.querySelector('#tab-create-listing').click();
  }
  if (params.get('action') === 'biddings/') {
    document.querySelector('#tab-users-bids').click();
  }
};
init();

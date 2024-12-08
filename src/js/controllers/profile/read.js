import { readProfile } from '../../model/profile/read';

import { initTabComponent } from '../../utilities/initTabComponent';
import { authGuard } from '../../utilities/authGuard';
import { profileBannerContainer, tabComponentOnProfile } from '../../views/profile/viewProfile';
import {
  genHtmlProfileHero,
  renderProfileTabHeader,
  renderProfileTab1Content,
  renderProfileTab2Content,
  renderProfileTab3Content,
  initImgsObserver,
  initAddImgBtnObserver,
} from '../../model/profile/genHtml';

export async function renderProfilePage() {
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    const data = await readProfile(username);
    const currentUser = data.data;
    // console.log(currentUser);
    profileBannerContainer.insertAdjacentHTML('beforeend', await genHtmlProfileHero(currentUser));
    tabComponentOnProfile.insertAdjacentHTML('beforeend', renderProfileTabHeader());
    const [tab1Content, tab2Content, tab3Content] = await Promise.all([
      renderProfileTab1Content(currentUser, 6, 1),
      renderProfileTab2Content(currentUser, 6, 1),
      renderProfileTab3Content(),
      initImgsObserver(),
      initAddImgBtnObserver(),
    ]);

    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab1Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab2Content);
    tabComponentOnProfile.insertAdjacentHTML('beforeend', tab3Content);
    initTabComponent();
  } catch (error) {}
}

const init = async function () {
  await renderProfilePage();
};
init();

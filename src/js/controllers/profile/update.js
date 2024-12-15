import { authGuard } from '../../utilities/authGuard';
import { updateProfileBannerContainer } from '../../views/profile/viewProfile';
import { readProfile } from '../../model/profile/read';
import { genHtmlProfileHeroOnUpdatePage } from '../../views/profile/updateProfile';
import { updateProfileForm, collectProfileChangesData } from '../../views/profile/updateProfile';
import { updateProfileApiCall } from '../../model/profile/update';
import { initSpinner, terminateSpinner } from '../../utilities/spinner';
const renderHeroOnProfilePage = async function () {
  const spinnerContainer = document.querySelector('.spinner-container');
  initSpinner(spinnerContainer);
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    const data = await readProfile(username);
    const currentUser = data.data;
    updateProfileBannerContainer.classList.add(
      'border-b-2',
      'border-green-2',
      'dark:border-purple-light',
      'pb-6',
      'text-end'
    );
    updateProfileBannerContainer.insertAdjacentHTML(
      'beforeend',
      await genHtmlProfileHeroOnUpdatePage(currentUser)
    );
    terminateSpinner(spinnerContainer);
  } catch {
    throw new Error(error);
  }
};

const updateProfile = async function () {
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    updateProfileForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const userData = collectProfileChangesData(e);
      if (userData === false) return;
      const data = await updateProfileApiCall(username, userData);
      updateProfileForm.reset();
      window.scrollTo(0, 0);
      window.location.reload();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const init = async () => {
  await Promise.all([renderHeroOnProfilePage(), updateProfile()]);
};
init();

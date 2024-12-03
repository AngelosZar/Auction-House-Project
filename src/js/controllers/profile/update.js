import { authGuard } from '../../utilities/authGuard';
import { updateProfileBannerContainer } from '../../views/profile/viewProfile';
import { readProfile } from '../../model/profile/read';
import { genHtmlProfileHeroOnUpdatePage } from '../../model/profile/genHtml';
import { updateProfileForm, collectProfileChangesData } from '../../views/profile/updateProfile';
import { updateProfileApiCall } from '../../model/profile/update';

const renderHeroOnProfilePage = async function () {
  authGuard();
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  console.log(username);

  try {
    const data = await readProfile(username);
    console.log(data);
    const currentUser = data.data;
    console.log(currentUser);
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
  } catch {
    console.log(error);
  }
};

const updateProfile = async function () {
  const data = JSON.parse(localStorage.getItem('currentUser'));
  const username = data.name;
  try {
    updateProfileForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      console.log('e.target', e.target);
      const userData = collectProfileChangesData(e);
      console.log(userData);
      if (userData === false) return;
      const data = await updateProfileApiCall(username, userData);
      console.log(data);
      updateProfileForm.reset();
      window.scrollTo(0, 0);
      window.location.reload();
    });
  } catch (error) {
    throw new Error(error);
  }
};

await Promise.all([renderHeroOnProfilePage(), updateProfile()]);

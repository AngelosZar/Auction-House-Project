import { updateProfileApiCall } from '../../model/profile/update';
import { collectProfileChanges } from '../../views/profile/updateProfile';
import { testData } from '../../model/profile/update';
import { renderProfileHero } from './read';
import { parse } from 'dotenv';
import { authGuard } from '../../utilities/authGuard';
import { updateProfileBannerContainer } from '../../views/profile/viewProfile';
import { readProfile } from '../../model/profile/read';
import { genHtmlProfileHeroOnUpdatePage } from '../../model/profile/genHtml';

const updateProfilePage = async function () {
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
await updateProfilePage();
// test

import { createSingleCardOfUser } from '../views/home';
import { readProfiles } from '../model/profile/read';
import { sellerSection } from '../views/home';
import { returnToken } from '../utilities/returnToken';
import { initLazyLoading } from '../utilities/initLazyLoading';
import { initSpinner, terminateSpinner } from '../utilities/spinner';
export async function renderProfileCards() {
  if (!returnToken()) {
    const heading = document.querySelector('#top-sellers-heading');
    heading.classList.add('hidden');
    return;
  }
  initSpinner(sellerSection);
  try {
    const data = await readProfiles(12, 1, true);
    console.log(data);
    const users = data;

    const parentContainer = sellerSection;

    if (!parentContainer) return;

    await generateProfileCardsHtml(users, parentContainer);
    terminateSpinner(sellerSection);
    initLazyLoading();
  } catch (error) {
    throw error;
  }
}

export const generateProfileCardsHtml = async function (users, parentContainer) {
  // console.log(users);
  users.forEach((user) => {
    const cards = createSingleCardOfUser(user);
    parentContainer.insertAdjacentHTML('beforeend', cards);
  });
};

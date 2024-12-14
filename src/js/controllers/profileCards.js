import { createSingleCardOfUser } from '../views/home';
import { readProfiles } from '../model/profile/read';
import { sellerSection } from '../views/home';
import { returnToken } from '../utilities/returnToken';

export async function renderProfileCards() {
  try {
    if (!returnToken()) {
      const heading = document.querySelector('#top-sellers-heading');
      heading.classList.add('hidden');
      return;
    }
    const data = await readProfiles(12, 1, true);
    const users = data;
    const parentContainer = sellerSection;

    if (!parentContainer) return;

    await generateProfileCardsHtml(users, parentContainer);
  } catch (error) {
    throw error;
  }
}

export const generateProfileCardsHtml = async function (users, parentContainer) {
  users.forEach((user) => {
    const cards = createSingleCardOfUser(user);
    parentContainer.insertAdjacentHTML('beforeend', cards);
  });
};

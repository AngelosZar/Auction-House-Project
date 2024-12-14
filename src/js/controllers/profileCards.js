import { createSingleCardOfUser } from '../views/home';
import { readProfiles } from '../model/profile/read';
import { sellerSection } from '../views/home';
export async function renderProfileCards() {
  try {
    const data = await readProfiles(12, 1, true);
    console.log(data);
    const users = data;
    console.log(users);
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

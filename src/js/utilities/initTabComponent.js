import { createListing } from '../model/listings/create';
let isInitialized = false;

export const initTabComponent = async function () {
  if (isInitialized) return;
  isInitialized = true;
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const btnCreateList = document.querySelector('#btnCreateList');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.id.replace('tab-', '');
      tabContents.forEach((content) => {
        content.classList.add('hidden');
      });

      tabs.forEach((tab) => {
        tab.classList.remove(
          'font-bold',
          'text-green-2',
          'dark:text-blue-400',
          'border-green-2',
          'dark:border-blue-400'
        );
        tab.classList.add('border-transparent');
      });

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.remove('hidden');
        tab.classList.add(
          'font-bold',
          'text-green-2',
          'dark:text-blue-400',
          'border-green-2',
          'dark:border-blue-400'
        );

        tab.classList.remove('border-transparent', 'border-none');
      }
    });
  });

  const form = document.querySelector('#create-listing-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const listingData = {
      title: formData.get('title'),
      description: formData.get('description'),
      tags: [formData.get('category')],
      endsAt: formData.get('end-auction-date'),
      media: Array.from(formData.getAll('image-url')).map((url, index) => ({
        url: url,
        alt: formData.get('image-alt')[index],
      })),
    };

    if (formData.get('starting-price')) {
      listingData._amount = Number(formData.get('starting-price') || +1);
    }

    try {
      await createListing(listingData);
      form.reset();
    } catch (error) {
      throw error;
    }
  });
};

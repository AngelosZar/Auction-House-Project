import { createListing } from '../model/listings/create';
export const initTabComponent = async function () {
  console.log('working yo');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const form = document.querySelector('#create-listing-form');
  const btnCreateList = document.querySelector('#btnCreateList');
  //   console.log(tabs);
  //   console.log(tabContents);
  //
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      //   console.log('clicked');
      //   console.log('Tab ID:', tab.id);
      const targetId = tab.id.replace('tab-', '');
      //   console.log('Target Id:', targetId);
      //
      tabContents.forEach((content) => {
        content.classList.add('hidden');
      });
      //
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
        //   document.getElementById(targetId).classList.remove('hidden')
        tab.classList.remove('border-transparent', 'border-none');
      }
    });
  });

  // console.log(createListingForm);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const listingData = {
      title: formData.get('title'),
      description: formData.get('description'),
      tags: [formData.get('category')],
      endsAt: formData.get('end-auction-date'),
      media: [
        {
          url: formData.get('image-url').toString(),
          alt: formData.get('image-alt') || 'image',
        },
      ],
    };
    const startingPrice = formData.get('starting-price');
    if (formData.get('starting-price')) {
      listingData._amount = Number(formData.get('starting-price'));
    }
    console.log('Data to send to API:', listingData);
    // make api call\
    try {
      await createListing(listingData);
      form.reset();
    } catch (error) {
      throw error;
    }
  });
};

// {
//   "title": "string", // Required
//   "description": "string", // Optional
//   "tags": ["string"], // Optional
//   "media": [
//     {
//       "url": "https://url.com/image.jpg",
//       "alt": "string"
//     }
//   ], // Optional
//   "endsAt": "2020-01-01T00:00:00.000Z" // Required - Instance of new Date()
// }

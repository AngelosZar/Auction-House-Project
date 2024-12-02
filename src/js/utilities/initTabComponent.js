import { createListing } from '../model/listings/create';
export const initTabComponent = async function () {
  console.log('working yo');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
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
    // const startingPrice = formData.get('starting-price');
    if (formData.get('starting-price')) {
      listingData._amount = Number(formData.get('starting-price') || +1);
    }

    console.log('formData to send to API:', listingData);
    // make api call\
    try {
      await createListing(listingData);
      form.reset();
    } catch (error) {
      throw error;
    }
  });

  // Render more image inputs mulfunctioning for now / check on later
  // document.querySelector('#addMoreImgs').addEventListener('click', (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   const container = document.querySelector('#imgs-container');
  //   const newInput = document.createElement('div');
  //   newInput.className = 'imgs-group-container';
  //   newInput.innerHTML = `
  //    <input
  //     type="url"
  //     name="image-url"
  //     class="input-forms mt-1"
  //     required
  //     placeholder="Only valid url"
  //     pattern="https://.*"
  //   />
  //   <input
  //     type="text"
  //     name="image-alt"
  //     class="input-forms mt-1"
  //     required
  //     placeholder="Image alt text"
  //   />
  //   <button class="bg-red-600 border-2 border-white rounded-lg px-4 py-2 remove-img mb-4">Remove</button>
  //   `;
  //   container.appendChild(newInput);
  // });
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

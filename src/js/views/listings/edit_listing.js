import { readListing } from '../../model/listings/readListings';
import { updateListing } from '../../model/listings/update';
export const renderEditListingForm = async function (parentContainer, listingId) {
  if (!parentContainer) return;

  try {
    const {
      data: { title, description, endsAt, media, tags },
    } = await readListing(listingId);
    const html = `
  <div class=" max-w-3xl mt-8 px-8 md:px-0 pb-16" id="" data-listing-link >
    <section class="min-h-screen">
      <div class="max-w-xl mx-auto m-5 px-5 py-10 sm:m-10 sm:p-10 md:px-20 md:py-10 bg-light-cards dark:bg-purple-dark rounded-lg shadow-xl">
        <h5 class="font-bold mb-4 md:text-5xl md:mb-10 dark:text-white text-center">
          Edit your listing
        </h5>
        <div class="mb-2">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            class="input-forms mt-1"
            required
            placeholder="${title}"
          />
        </div>
        <div>
          <label for="description">Description <span class="  block mt-1">Max 120 characters</span></label>
        <textarea
          name="description"
          id="description"
          cols="10"
          rows="5"
          class="input-forms mt-1"
          maxlength="120"
          placeholder="${description}"
        ></textarea>


        </div>
        <div class="mb-2">
          <label for="category" class="relative">Category</label>
          <select name="category" id="category" class="input-forms mt-1" required>
            <option value="">Select Category</option>
        <option value="Electronics" ${tags[0] === 'Electronics' ? 'selected' : ''}>Electronics</option>
         <option value="Home & Garden" ${tags[0] === 'Home & Garden' ? 'selected' : ''}>Home & Garden</option>
         <option value="Fashion & Accessories" ${tags[0] === 'Fashion & Accessories' ? 'selected' : ''}>Fashion & Accessories</option>
         <option value="Collectibles" ${tags[0] === 'Collectibles' ? 'selected' : ''}>Collectibles</option>
         <option value="Art & Antiques" ${tags[0] === 'Art & Antiques' ? 'selected' : ''}>Art & Antiques</option>
         <option value="Vehicles & Parts" ${tags[0] === 'Vehicles & Parts' ? 'selected' : ''}>Vehicles & Parts</option>
         <option value="Sports & Outdoors" ${tags[0] === 'Sports & Outdoors' ? 'selected' : ''}>Sports & Outdoors</option>
         <option value="Toys & Hobbies" ${tags[0] === 'Toys & Hobbies' ? 'selected' : ''}>Toys & Hobbies</option>
         <option value="Books, Music & Movies" ${tags[0] === 'Books, Music & Movies' ? 'selected' : ''}>Books, Music & Movies</option>
         <option value="Industrial & Business" ${tags[0] === 'Industrial & Business' ? 'selected' : ''}>Industrial & Business</option>
            <option value="">None of the above</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="end-auction-date">End auction at</label>
          <span class="">Format: YYYY-MM-DD 24:00</span>
          <input
            type="datetime-local"
            name="end-auction-date"
            id="end-auction-date"
            class="input-forms mt-1"
            placeholder="YYYY-MM-DD 24:00"
            value="${endsAt.slice(0, 16)}"
            required
          />
        </div>
        <div class="mb-2">
          <label for="starting-price">Starting price</label>
          <input
            type="number"
            name="starting-price"
            id="starting-price"
            class="input-forms mt-1"
            required
            min="1"
            placeholder="Minimum Bid starts at 1 NOK"
          />
        </div>
        <div class="mb-2">
            <div class="mb-4">
       <label>Current Images</label>
<div class="grid grid-cols-2 gap-4 mt-2">
 ${media
   .slice(0, 4)
   .map(
     (img, index) => `
   <div class="relative group cursor-pointer" data-img-index="${index}" data-img-url="${img.url}">
     <img 
       src="${img.url}" 
       alt="${img.alt}" 
       class="w-full h-32 object-cover rounded transition-opacity hover:opacity-70"
       onclick="this.classList.toggle('opacity-50'); this.nextElementSibling.classList.toggle('hidden')"
     >
     <span class="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
       Selected for deletion
     </span>
   </div>
 `
   )
   .join('')}
</div>
     </div>
          <label for="images">Add more Images</label>
          <div  data-imgs-container>
            <div class="imgs-group-container">
              <input
                type="url"
                name="image-url"
                id="image"
                class="input-forms mt-1"
                required
                placeholder="Only valid url"
                pattern="https://.*"
              />
              <input
                type="text"
                name="image-alt"
                id="image-alt"
                class="input-forms mt-1"
                placeholder="Image alt text"
              />
            </div>
          </div>
          <a href="#" class="addMoreImgs btn btn-secondary dark:btn-secondary-dark mb-4">Add more images</a>
        </div>
        <button class="btn btn-primary dark:btn-primary-dark" type="submit" id="submitEditListing">Submit</button>
      </div>
    </section>
  </div>
`;
    parentContainer.insertAdjacentHTML('afterbegin', html);

    const submitBtn = document.getElementById('submitEditListing');
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const formData = getFormData();
        await updateListing(formData, listingId);
        window.location.reload();
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
};

const getFormData = () => {
  const formData = {};

  const title = document.getElementById('title').value;
  if (title) formData.title = title;

  const description = document.getElementById('description').value;
  if (description) formData.description = description;

  const category = document.getElementById('category').value;
  if (category) formData.tags = [category];

  const images = Array.from(document.querySelectorAll('.imgs-group-container'))
    .map((group) => ({
      url: group.querySelector('[name="image-url"]').value,
      alt: group.querySelector('[name="image-alt"]').value,
    }))
    .filter((img) => img.url && img.alt);

  if (images.length) formData.media = images;

  return formData;
};

export const renderEditListingForm = function (parentContainer) {
  if (!parentContainer) {
    return;
  }
  const html = `
<form id="editListingForm" method="put" class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div class="mb-4">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="title">
      Title
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Listing title" required>
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="description">
      Description
    </label>
    <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" rows="4" placeholder="Describe your item" required></textarea>
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="tags">
      Tags
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tags" type="text" placeholder="luxury, handbags">
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="media">
      Media URLs
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="media" type="text" placeholder="https://image1.jpg, https://image2.jpg">
  </div>

  <div class="mb-6">
    <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" for="endsAt">
      Auction End Date
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endsAt" type="datetime-local" required>
  </div>

  <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Update Listing
    </button>
  </div>
</form>
`;
  //   parentContainer.insertAdjacentHTML('afterbegin', html);
  parentContainer.innerHTML = html;
};

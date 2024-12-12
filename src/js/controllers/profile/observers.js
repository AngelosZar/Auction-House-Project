/**
 * It sets a mutation observer to listen for click on images on the renderProfileTab1Content html and redirects to the single-listing page
 * @function renderProfileTab1Content
 * @description then stores the listingId in the local storage and redirects to the single-listing page.
 */

export const initImgsObserver = function () {
  const observer = new MutationObserver((mutations) => {
    const container = document.querySelectorAll('[data-listing-link]');
    if (!container.length) {
      return;
    }
    if (container.length) {
      container.forEach((container) => {
        container.addEventListener('click', (e) => {
          e.preventDefault();
          const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
          localStorage.setItem('listingId', listingId);
          window.location.href = '/biddings/single-listing/';
        });
      });
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

/**
 * Sets up a mutation observer to watch for the "Add More Images" button and handles adding new image input groups
 * @function initAddImgBtnObserver
 * @description Observes DOM for button presence, adds click handler to dynamically insert new image input fields
 * @listens click - On addMoreImgs button click
 * @mutationObserver Watches body for button presence
 */
export const initAddImgBtnObserver = function () {
  const observer = new MutationObserver((mutations) => {
    const btn = document.getElementById('addMoreImgs');
    if (!btn) {
      return;
    }
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // const container = document.getElementById('imgs-group-container');
        const container = document.getElementById('imgs-container');
        // const newImgGroup = document.createElement('div');
        const newImgGroup = `
         <div class="image-input-group mb-4">
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
                       required
                       placeholder="Image alt text"
                     />
           </div>`;
        container.insertAdjacentHTML('beforeend', newImgGroup);
      });
    }
    observer.disconnect();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

import { deleteListing } from '../../model/listings/delete';

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

// data-edit-btn
// data-delete-btn
export const initDeleteBtnObserver = async function () {
  const observer = new MutationObserver((mutations) => {
    const containers = document.querySelectorAll('[data-delete-btn]');

    if (!containers.length) return;

    containers.forEach((container) => {
      container.addEventListener('click', async (e) => {
        e.preventDefault();
        const listingId = e.target.closest('[data-listing-id]').dataset.listingId;

        if (confirm('Are you sure you want to delete this listing?')) {
          try {
            await deleteListing(listingId);
            if (window.location.pathname.includes('/profile')) {
              window.location.reload();
            } else if (window.location.pathname === '/biddings/single-listing/') {
              window.location.replace('/profile/?action=listings/');
            }
          } catch (error) {
            throw new Error(error);
          }
        }
      });
    });

    observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

export const initEditBtnObserver = async function () {
  const observer = new MutationObserver((mutations) => {
    const containers = document.querySelectorAll('[data-edit-btn]');
    if (!containers.length) return;
    containers.forEach((container) => {
      container.addEventListener('click', async (e) => {
        e.preventDefault();
        const listingId = e.target.closest('[data-listing-id]').dataset.listingId;
        localStorage.setItem('listingId', listingId);
        alert('Edit feature is not yet implemented');
        // window.location.href = '/profile/?action=create/';
      });
    });

    observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

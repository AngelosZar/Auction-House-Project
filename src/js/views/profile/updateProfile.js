export const updateProfileForm = document.querySelector('#update-profile-form');

export const collectProfileChangesData = (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.bio.value && !form['avatar-url'].value && !form['banner-url'].value) {
    alert('Please fill at least one field: Bio, Avatar URL, or Banner URL');
    return null;
  }
  //
  const userData = {};
  if (form.bio.value) userData.bio = form.bio.value;

  if (form['avatar-url'].value) {
    userData.avatar = {
      url: form['avatar-url'].value,
      alt: form['avatar-alt'].value || '',
    };
  }

  if (form['banner-url'].value) {
    userData.banner = {
      url: form['banner-url'].value,
      alt: form['banner-alt'].value || '',
    };
  }
  return userData;
};

/**
 * Generate html for profile hero on update page // deference is the edit profile button
 * @param {*} currentUser
 * @param {*} object . data from the current user / avatar / banner, username, credits
 * @returns html
 */
export const genHtmlProfileHeroOnUpdatePage = async function (currentUser) {
  return `
   <div class="lg:mb-18 relative mb-8 max-w-screen-2xl xs:mb-12 md:mb-14 lg:mb-20 z-0" >
          <img
            alt="Profile Banner"
            class="h-[15vh] w-full object-cover md:h-[20vh] lg:h-[30vh]"
            src="${currentUser.banner?.url}"
          />
       <img
            alt="User Avatar"
            class="avatar-img top xs:left-6md:-bottom-14 absolute -bottom-5 left-4 h-28 w-28 rounded-full xs:-bottom-12 md:left-8 md:h-36 md:w-36 lg:-bottom-16 lg:left-10 lg:h-44 lg:w-44 xl:-bottom-20 xl:h-52 xl:w-52"
            src="${currentUser.avatar?.url}"
          />
        </div>
        <div class="mx-6 xl:mx-12 self-end">
          <h5 class="font-semibold text-green-2 dark:text-purple-light pb-2" >${currentUser.name}</h5>
          <p class="pb-1" >Verified user ✌️</p>
          <p class="pb-1" >Credit Points: ${currentUser.credits}</p>
        </div>`;
};

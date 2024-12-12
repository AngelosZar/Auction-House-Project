export const profileBannerContainer = document.querySelector('#profile-banner-container');
export const updateProfileBannerContainer = document.querySelector(
  '#update-profile-banner-container'
);
export const tabComponentOnProfile = document.querySelector('#tab-component-on-profile');
export const createListingForm = document.querySelector('#create-listing-form');
export const onCreateList = document.querySelector('#onCreateList');

export const genHtmlProfileHero = async function (currentUser) {
  return `
        <div class="lg:mb-18 relative mb-8 max-w-screen-2xl xs:mb-12 md:mb-14 lg:mb-20 z-0">
          <img
            alt="Profile Banner"
            class="h-[15vh] w-full object-cover md:h-[20vh] lg:h-[30vh] z-0"
            src="${currentUser.banner?.url}"
          />
          <img
            alt="User Avatar"
            class="avatar-img top xs:left-6md:-bottom-14 absolute -bottom-5 left-4 h-20 w-20 rounded-full xs:-bottom-12 xs:h-28 xs:w-28 md:left-8 md:h-36 md:w-36 lg:-bottom-16 lg:left-10 lg:h-44 lg:w-44 xl:-bottom-20 xl:h-52 xl:w-52"
            src="${currentUser.avatar?.url}"
          />
        </div>
        <div class="mx-6 xl:mx-12 self-end">
          <h6 class="font-semibold text-green-2 dark:text-purple-light pb-2" >${currentUser.name}</h6>
          <p class="pb-1" >Verified user ✌️</p>
          <p class="pb-1" >Credit Points: ${currentUser.credits}</p>
          <a
            href="../profile/update/"
            class="btn btn-secondary dark:btn btn-secondary-dark pt-2"
            id="editProfile"
            >Edit profile</a
          >
        </div>`;
};

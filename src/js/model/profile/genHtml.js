export const genHtmlProfileHero = async function (currentUser) {
  return `
   <div class="lg:mb-18 relative mb-8 max-w-screen-2xl xs:mb-12 md:mb-14 lg:mb-20">
          <img
            alt="Profile Banner"
            class="h-[15vh] w-full object-cover md:h-[20vh] lg:h-[30vh]"
            src="${currentUser.avatar?.url}"
          />
          <img
            alt="User Avatar"
            class="avatar-img top xs:left-6md:-bottom-14 absolute -bottom-5 left-4 h-20 w-20 rounded-full xs:-bottom-12 xs:h-28 xs:w-28 md:left-8 md:h-36 md:w-36 lg:-bottom-16 lg:left-10 lg:h-44 lg:w-44 xl:-bottom-20 xl:h-52 xl:w-52"
            src="${currentUser.banner?.url}"
          />
        </div>
        <div class="mx-6 xs:my-4 xs:text-xl md:mx-8 md:text-2xl xl:mx-12 self-end">
          <h5 class="">${currentUser.name}</h5>
          <p>Verified user ✌️</p>
          <p>Credit Points: ${currentUser.credits}</p>
          <a
            href="../profile/update/"
            class="btn btn-secondary dark:btn btn-secondary-dark"
            id="editProfile"
            >Edit profile</a
          >
        </div>`;
};

export const renderProfileTabHeader = async function () {
  //
};
export const renderProfileTab1Content = async function () {
  //
};
export const renderProfileTab2Content = async function () {
  //
};
export const renderProfileTab3Content = async function () {
  //
};

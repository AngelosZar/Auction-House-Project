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

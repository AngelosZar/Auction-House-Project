export const updateProfileForm = document.querySelector('#update-profile-form');

export const collectProfileChangesData = (e) => {
  e.preventDefault();
  const form = e.target;
  console.log(form);
  console.log(e.target);
  // const hasValue =
  //   form.bio.value ||
  //   form['avatar-url'].value ||
  //   form['avatar-alt'].value ||
  //   form['banner-url'].value ||
  //   form['banner-alt'].value;
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
  console.log(userData);
  return userData;
  // } else {
  //   return {
  //     bio: form.bio.value || '',
  //     avatar: {
  //       url: form['avatar-url'].value,
  //       alt: form['avatar-alt'].value || '',
  //     },
  //     banner: {
  //       url: form['banner-url'].value,
  //       alt: form['banner-alt'].value || '',
  //     },
  //   };
  // }
};

// {
//   "bio": "string",
//   "avatar": {
//     "url": "https://picsum.photos/id/135/800/800",
//     "alt": ""
//   },
//   "banner": {
//     "url": "https://picsum.photos/id/888/1500/500",
//     "alt": ""
//   }
// }

//
// update later to:
// {
//   "data": {
//     "name": "string",
//     "email": "user@example.com",
//     "bio": "string",
//     "avatar": {
//       "url": "https://url.com/image.jpg",
//       "alt": "string"
//     },
//     "banner": {
//       "url": "https://url.com/image.jpg",
//       "alt": "string"
//     },
//     "credits": 0,
//     "_count": {
//       "listings": 0,
//       "wins": 0
//     }
//   },
//   "meta": {}
// }

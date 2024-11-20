import { signInApiCall } from '../../model/auth/sign_in';

export const signInController = async (event) => {
  event.preventDefault();
  const form = event.target;
  //   console.log(form);
  //   console.log('iam here');
  const data = {
    email: form.email.value,
    password: form.password.value,
  };
  try {
    const result = await signInApiCall(data);
    // console.log(result);
    // const {
    //   data: {
    //     name,
    //     email,
    //     accessToken,
    //     avatar: { url: avatarUrl, alt: avatarAlt },
    //     banner: { url: bannerUrl, alt: bannerAlt },
    //   },
    // } = await result;
    // //
    // const currentUser = {
    //   name,
    //   email,
    //   accessToken,
    //   avatar: { url: avatarUrl, alt: avatarAlt },
    //   banner: { url: bannerUrl, alt: bannerAlt },
    // };
    // console.log('i am the current user yo', currentUser);
    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
    console.log('result form the controller', result);
    alert('You have successfully signed in');
  } catch (error) {}
};

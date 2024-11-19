import { signUpApiCall } from '../../model/auth/sign_up';
import { validatePassword } from '../../utilities/ValidatePassword';

export async function onSignUpUser(event) {
  event.preventDefault();
  //   make make this another function
  const form = event.target;
  console.log(form);
  //   const name = form.username.value;
  //   console.log('name', name);
  //   const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  if (!validatePassword(password, confirmPassword)) {
    alert('Passwords do not match \n Please insert the same password in both fields');
    return;
  }
  //   const bio = form.bio.value;
  //   const profileImg = form.profileImg.value;
  //   const profileImgAlt = form.profileImgAlt.value;
  //
  //   console.log('password', password);
  //   console.log('confirmPassword', confirmPassword);
  //   const confirmPassword = form.target.confirmPassword.value;
  console.log(confirmPassword);
  //   up to here

  const userData = {
    name: form.username.value,
    email: form.username.value,
    password: form.password.value,
    bio: form.bio?.value || undefined,
    avatar: form.profileImg?.value
      ? {
          url: form.profileImg.value,
          alt: form.profileImgAlt?.value || '',
        }
      : undefined,
  };
  console.log('userData', userData);
  //   console.log('i got the data', userData);
  //   prompt('i grabbed the data', userData);

  //   form.reset();
  try {
    const res = await signUpApiCall(userData);
    const data = await res.json();
    console.log(data);
    alert('User created successfully');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.log('i am doing all the work');
  } finally {
    // prompt('i am resetting the form');
    // form.reset();
  }
}

import { signUpApiCall } from '../../model/auth/sign_up';
import { validatePassword } from '../../utilities/ValidatePassword';

export async function onSignUpUser(event) {
  event.preventDefault();
  const form = event.target;
  console.log(form);
  // password validation
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  if (!validatePassword(password, confirmPassword)) {
    alert('Passwords do not match \n Please insert the same password in both fields');
    return;
  }
  // grab user data
  const userData = {
    name: form.username.value,
    email: form.email.value,
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
  // call the api
  try {
    const res = await signUpApiCall(userData);
    const data = await res.json();
    console.log(data);
    alert('User created successfully');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.log('i am doing all the work');
  } finally {
    prompt('i am resetting the form');
    form.reset();
  }
}

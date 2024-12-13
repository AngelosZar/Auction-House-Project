import { signUpApiCall } from '../../model/auth/sign_up';
import { validatePassword } from '../../utilities/validatePassword';
import { getApiKey } from '../../utilities/apiKey';

export async function onSignUpUser(event) {
  event.preventDefault();

  const form = event.target;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (!validatePassword(password, confirmPassword)) {
    return;
  }

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

  try {
    const res = await signUpApiCall(userData);
    if (res.ok) {
      alert('User created successfully');
      window.location.href = '/auth/sign_in/';
    }
  } catch (error) {
    alert('Ops, Something went wrong please\nPlease try again');
  } finally {
    form.reset();
  }
}

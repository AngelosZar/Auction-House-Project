import { signUpApiCall } from '../../model/auth/sign_up';
import { validatePassword } from '../../utilities/ValidatePassword';

export async function onSignUpUser(event) {
  event.preventDefault();

  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  if (!validatePassword(password, confirmPassword)) {
    alert('Passwords do not match \n Please insert the same password in both fields');
    return;
  }

  const form = event.target;
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
    prompt('User created successfully');
    window.location.href = '/auth/login/';
  } catch (error) {
    throw error;
  } finally {
    form.reset();
  }
}

import { signUpApiCall } from '../../model/auth/sign_up';
export async function onSignUpUser(event) {
  //   event.preventDefault();
  //   make make this another function
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.target.confirmPassword.value;
  //   up to here

  const userData = {
    name: name,
    email: email,
    password: password,
    confirmPassword,
    // optional
    bio: bio || undefined,
    avatar: profileImg ? { url: profileImg, alt: profileImgAlt || '' } : undefined,
  };
  prompt('i grabbed the data', userData);
  try {
    const response = await signUpApiCall(userData);
    if (!response.ok) {
      alert(res.errors[0].message);
      throw new Error(res.errors[0].message);
      alert('User created successfully');
      window.location.href = '/auth/login/';
    }
  } catch (error) {
    console.log('i am doing all the work');
  } finally {
    prompt('i am resetting the form');
    form.reset();
  }
}

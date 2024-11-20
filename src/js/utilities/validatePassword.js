export function validatePassword(password, confirmPassword) {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  if (!password === confirmPassword) {
    alert('Passwords do not match \n Please insert the same password in both fields');
  }

  if (!regex.test(password)) {
    alert(
      'Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character'
    );
  }
  return regex.test(password) && password === confirmPassword;
}

export function validatePassword(password, confirmPassword) {
  if (!password === confirmPassword) {
    alert('Passwords do not match \n Please insert the same password in both fields');
    return false;
  }
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:,.<>?]/.test(password);

  if (password.length < minLength) {
    alert('Password must be at least 8 characters long');
    return false;
  }
  if (!hasUpperCase) {
    alert('Password must contain at least one uppercase letter');
    return false;
  }
  if (!hasLowerCase) {
    alert('Password must contain at least one lowercase letter');
    return false;
  }
  if (!hasNumbers) {
    alert('Password must contain at least one number');
    return false;
  }
  if (!hasSpecialChar) {
    alert('Password must contain at least one special character');
    return false;
  }
  return true;
}

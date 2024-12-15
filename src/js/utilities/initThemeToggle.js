export const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  console.log(themeToggle);
  if (!themeToggle) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log(prefersDark);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  console.log(prefersLight);
  //   const theme = localStorage.getItem('theme');
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target);
    let theme = document.documentElement.getAttribute('data-theme');
    console.log();
  });
};

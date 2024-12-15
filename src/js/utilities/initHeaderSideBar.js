export const initHeaderSideBar = () => {
  const menuBtn = document.querySelector('.menu-btn');
  const sideBar = document.querySelector('.sidebar');
  if (!menuBtn || !sideBar) return;

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sideBar.classList.toggle('-translate-x-full');
  });
  //
  document.addEventListener('click', (e) => {
    if (!sideBar.contains(e.target) && !menuBtn.contains(e.target)) {
      sideBar.classList.add('-translate-x-full');
    }
  });
};

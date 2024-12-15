export const initLazyLoading = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
        observer.unobserve(img);
      }
    });
  });
  const lazyImages = document.querySelectorAll('.lazy-image');
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
};

export const initCarousel = async function () {
  const carousel = document.querySelector('#carousel-component');
  //   console.log('carousel:', carousel);
  const slides = document.querySelectorAll('[data-carousel="slide"]');
  //   console.log('slides:', slides);
  const previousBtn = document.querySelector('#carousel-btn-previous');
  const nextBtn = document.querySelector('#carousel-btn-next');
  //   slides.style.transform = 'scale(0.5)';
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * index}%)`;
    // slide.classList.remove('hidden');
  });
};

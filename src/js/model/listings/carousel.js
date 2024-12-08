export const initCarousel = async function () {
  const carousel = document.querySelector('#carousel-component');
  console.log('carousel:', carousel);
  const slides = document.querySelectorAll('[data-carousel="slide"]');
  console.log('slides:', slides.length);
  const previousBtn = document.querySelector('#carousel-btn-previous');
  const nextBtn = document.querySelector('#carousel-btn-next');
  const dotsContainer = document.querySelector('#carousel-dots');
  console.log(previousBtn, nextBtn, dotsContainer);

  let currentSlide = 0;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * index}%)`;
    slide.classList.remove('hidden');
  });
  //
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    console.log(dot);
    dot.classList.add('w-3', 'h-3', 'carousel-dot', 'rounded-full', 'bg-white', 'opacity-50');
    dotsContainer.appendChild(dot);
    // dot.addEventListener('click', () => {]); // add event listener to dots to change slide
  });

  const updateCurrentDot = function () {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.remove('opacity-50');
        dot.classList.add('opacity-100', 'bg-green-2', 'dark:bg-blue-400');
      } else {
        dot.classList.remove('opacity-100', 'bg-green-2', 'dark:bg-blue-400');
        dot.classList.add('opacity-50');
      }
    });
  };
  nextBtn.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateCurrentDot();
  });
  //
  previousBtn.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateCurrentDot();
  });

  updateCurrentDot();
};

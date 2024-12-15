export const initCarousel = async function () {
  const carousel = document.querySelector('#carousel-component');
  const slides = document.querySelectorAll('[data-carousel="slide"]');
  const previousBtn = document.querySelector('#carousel-btn-previous');
  const nextBtn = document.querySelector('#carousel-btn-next');
  const dotsContainer = document.querySelector('#carousel-dots');

  if (!carousel) return;

  let currentSlide = 0;
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * index}%)`;
    slide.classList.remove('hidden');
  });

  slides.forEach((_, index) => {
    const dot = document.createElement('button');

    dot.classList.add('w-3', 'h-3', 'carousel-dot', 'rounded-full', 'bg-white', 'opacity-50');
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', function () {
      currentSlide = index;
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      });
      updateCurrentDot();
    });
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
  if (!nextBtn || !previousBtn) return;
  nextBtn.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % slides.length;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateCurrentDot();
  });

  previousBtn.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
    updateCurrentDot();
  });

  updateCurrentDot();
};

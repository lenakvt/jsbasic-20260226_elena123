function initCarousel() {
  const inner = document.querySelector('.carousel__inner');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  leftArrow.style.display = 'none'; // Для первого слайда стрелки нет
  const slides = document.querySelectorAll('.carousel__slide');

  let currentSlideIndex = 0; //Начальное положение - первый слайд
  const slideWidth = slides[0].offsetWidth; //Проверить ширину слайда
  const maxSlides = slides.length; //Проверить максимальное количество слайдов

  //Переключать карусель вправо 
  rightArrow.addEventListener('click', () => {
    const maxSlidesIndex = maxSlides - 1;
    if (currentSlideIndex < maxSlidesIndex) {
      currentSlideIndex++;
      inner.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`; //Клик на правую стрелку
    }
    //Если последний слайд, то скрыть кнопку переключения вперёд
    if (currentSlideIndex === maxSlidesIndex) {
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }
  });
  //Переключать карусель влево 
  leftArrow.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      inner.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`; //Клик на левую стрелку
    }
    //Если первый слайд, то скрыть кнопку переключения назад
    if (currentSlideIndex === 0) {
      leftArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  });
}


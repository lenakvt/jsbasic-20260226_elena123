import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  get elem() {
    return this._elem;
  }

  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0; //Начальное положение - первый слайд

    // Создаем корневой элемент карусели
    this._elem = createElement(`
      <div class="carousel">
        <div class="carousel__inner">
          ${slides.map(slide => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);

    this.startCarusel();
  }

  startCarusel() {
    const inner = this._elem.querySelector('.carousel__inner');
    const rightArrow = this._elem.querySelector('.carousel__arrow_right');
    const leftArrow = this._elem.querySelector('.carousel__arrow_left');
    const slideWidth = 500; //Ширина слайда
    const maxSlides = this.slides.length; //Проверить максимальное количество слайдов

    // Скрыть левую стрелку в начале
    leftArrow.style.display = 'none';

    //Переключать карусель вправо 
    rightArrow.addEventListener('click', () => {
      const maxSlidesIndex = maxSlides - 1;
      if (this.currentSlideIndex < maxSlidesIndex) {
        this.currentSlideIndex++;
        inner.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`; //Клик на правую стрелку
      }
      //Если последний слайд, то скрыть кнопку переключения вперёд
      if (this.currentSlideIndex === maxSlidesIndex) {
        rightArrow.style.display = 'none';
      } else {
        leftArrow.style.display = '';
      }
    });

    //Переключать карусель влево 
    leftArrow.addEventListener('click', () => {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
        inner.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`; //Клик на левую стрелку
      }
      //Если первый слайд, то скрыть кнопку переключения назад
      if (this.currentSlideIndex === 0) {
        leftArrow.style.display = 'none';
      } else {
        rightArrow.style.display = '';
      }
    });

    // Обработка клика на кнопку добавления в корзину
    const buttons = this._elem.querySelectorAll('.carousel__button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const event = new CustomEvent('product-add', {
          detail: this.slides[index].id,
          bubbles: true
        });
        this._elem.dispatchEvent(event);
      });
    });
  }
}

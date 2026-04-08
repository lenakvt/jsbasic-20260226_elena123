import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.init();
  }

  render() {
    // Создаем шаги слайдера
    const stepsHtml = Array.from({ length: this.steps }, (_, index) => `
      <span${index === this.value ? ' class="slider__step-active"' : ''}></span>
    `).join('');

    // Вычисляем начальное положение в процентах
    const segments = this.steps - 1;
    const valuePercents = segments ? (this.value / segments * 100) : 0;

    const slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${valuePercents}%">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${valuePercents}%"></div>
        <div class="slider__steps">
          ${stepsHtml}
        </div>
      </div>
    `);

    return slider;
  }

  init() {
    // Обработчик клика по слайдеру
    this.elem.addEventListener('click', (event) => {
      // Вычисляем расстояние от начала слайдера до клика в пикселях
      const left = event.clientX - this.elem.getBoundingClientRect().left;

      // Вычисляем относительное значение от 0 до 1
      const leftRelative = left / this.elem.offsetWidth;

      // Находим приблизительное значение
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;

      // Округляем до ближайшего шага
      this.value = Math.round(approximateValue);

      // Ограничиваем значение в допустимый диапазон
      this.value = Math.max(0, Math.min(this.value, this.steps - 1));

      // Обновляем визуальное отображение
      this.updateDisplay();

      // Генерируем пользовательское событие
      const customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });
  }

  updateDisplay() {
    const segments = this.steps - 1;
    const valuePercents = segments ? (this.value / segments * 100) : 0;

    // Обновляем значение
    const valueElement = this.elem.querySelector('.slider__value');
    valueElement.textContent = this.value;

    // Переносим активный класс на правильный шаг
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });

    // Перемещаем ползунок
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${valuePercents}%`;

    // Расширяем закрашенную область
    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = `${valuePercents}%`;
  }
}
import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.isDragging = false;
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
    const thumb = this.elem.querySelector('.slider__thumb');

    // Отключаем встроенный браузерный Drag-and-Drop
    thumb.ondragstart = () => false;

    // Обработчик клика по слайдеру
    this.elem.addEventListener('click', (event) => {
      // Если это клик во время перетаскивания, пропускаем
      if (this.isDragging) return;

      this.handleSliderClick(event);
    });

    // Начало перетаскивания
    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.isDragging = true;
      this.elem.classList.add('slider_dragging');
    });

    // Перемещение ползунка
    document.addEventListener('pointermove', (event) => {
      if (!this.isDragging) return;

      event.preventDefault();
      this.moveSlider(event);
    });

    // Конец перетаскивания
    document.addEventListener('pointerup', (event) => {
      if (!this.isDragging) return;

      this.isDragging = false;
      this.elem.classList.remove('slider_dragging');

      // Генерируем событие при отпускании
      this.dispatchSliderChange();
    });
  }

  handleSliderClick(event) {
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
    this.dispatchSliderChange();
  }

  moveSlider(event) {
    // Вычисляем расстояние от начала слайдера до курсора в пикселях
    let left = event.clientX - this.elem.getBoundingClientRect().left;

    // Вычисляем относительное значение от 0 до 1
    let leftRelative = left / this.elem.offsetWidth;

    // Ограничиваем значение в пределах 0 до 1
    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    // Вычисляем значение в процентах
    const leftPercents = leftRelative * 100;

    // Перемещаем ползунок и заполняем область
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    // Вычисляем конкретное значение шага
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    // Обновляем отображение значения и активного шага
    this.updateStepDisplay();
  }

  updateDisplay() {
    const segments = this.steps - 1;
    const valuePercents = segments ? (this.value / segments * 100) : 0;

    // Обновляем значение
    const valueElement = this.elem.querySelector('.slider__value');
    valueElement.textContent = this.value;

    // Переносим активный класс на правильный шаг
    this.updateStepDisplay();

    // Перемещаем ползунок
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${valuePercents}%`;

    // Расширяем закрашенную область
    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = `${valuePercents}%`;
  }

  updateStepDisplay() {
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
  }

  dispatchSliderChange() {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
}
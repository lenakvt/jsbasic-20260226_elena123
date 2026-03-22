function highlight(table) {
  const tbody = table.querySelector('tbody');

  for (let row of tbody.rows) {
    // Получаем нужные ячейки по индексам
    const ageCell = row.cells[1];      // Age (индекс 1)
    const genderCell = row.cells[2];   // Gender (индекс 2)
    const statusCell = row.cells[3];   // Status (индекс 3)

    // 1. Проверяем атрибут data-available в ячейке Status
    if (statusCell.hasAttribute('data-available')) {
      
      if (statusCell.getAttribute('data-available') === 'true') {
        row.classList.add('available');
      } else {
        row.classList.add('unavailable');
      }

    } else {
      // Если атрибута нет, добавляем hidden
      row.setAttribute('hidden', '');
    }

    // 2. Проверяем содержимое ячейки Gender
    const genderValue = genderCell.textContent.trim();
    if (genderValue === 'm') {
      row.classList.add('male');
    } else if (genderValue === 'f') {
      row.classList.add('female');
    }

    // 3. Проверяем значение Age
    const age = parseInt(ageCell.textContent.trim());
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
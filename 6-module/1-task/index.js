/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  // Геттер, который просто возвращает сохраненную ссылку
  get elem() {
    return this._table;
  }

  constructor(rows) {
    // Создаем таблицу один раз и сохраняем ссылку
    this._table = document.createElement('table');
    
    // Создаем заголовок (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
    
    headers.forEach(headerName => {
      const th = document.createElement('th');
      th.textContent = headerName;
      headerRow.append(th);
    });
    
    thead.append(headerRow);
    this._table.append(thead);
    
    // Создаем тело таблицы (tbody)
    const tbody = document.createElement('tbody');
    
    rows.forEach(row => {
      const tr = document.createElement('tr');
      
      // Добавляем ячейки с данными
      tr.append(this.createCell(row.name));
      tr.append(this.createCell(row.age));
      tr.append(this.createCell(row.salary));
      tr.append(this.createCell(row.city));
      
      // Добавляем ячейку с кнопкой удаления
      const tdButton = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = 'X';
      button.addEventListener('click', () => {
        tr.remove();
      });
      tdButton.append(button);
      tr.append(tdButton);
      
      tbody.append(tr);
    });
    
    this._table.append(tbody);
  }
  
  createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  }
}

function ucFirst(str) {
  if (typeof str !== 'string') return '';
  if (typeof str === 'string' && str.trim() === '') {
    return '';
  }
  
  return str[0].toUpperCase() + str.slice(1);
}
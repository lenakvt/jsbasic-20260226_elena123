function camelize(str) {
  let words = str.split('-');
  let firstLetter = words.slice(1).map(item => {
    return ucFirst(item);
  });
  return words[0]+firstLetter.join('');
}

function ucFirst(str) {
  if (typeof str !== 'string') return '';
  if (typeof str === 'string' && str.trim() === '') {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
}

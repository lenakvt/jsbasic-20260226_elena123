function getMinMax(str) {
  let stringarray = str.split(' ');

  let numbers = stringarray.map(item => Number(item))
    .filter(num => {
      if (!isNaN(num)) {
        return true;
      }
      return false;
    })

  let result = {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };

  return result;
}


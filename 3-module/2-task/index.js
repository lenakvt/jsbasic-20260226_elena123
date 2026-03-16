function filterRange(arr, a, b) {
  let result = arr.filter(element => {
    if (element >= a && element <= b) { return true;}
    return false;
  });
  return result;
}

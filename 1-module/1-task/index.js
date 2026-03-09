function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  let factorial = n;
  
  while(n > 1) {
      factorial = factorial * (n - 1);
      n = n - 1;
  }

  return factorial;
}
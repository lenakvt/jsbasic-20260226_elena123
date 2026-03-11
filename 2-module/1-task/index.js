function sumSalary(salaries) {
  let result = 0;
  let keys = Object.keys(salaries); 
  for (let i = 0; i < keys.length; i++) {
    let keyname = keys[i]; 

    if (typeof salaries[keyname] === 'number' 
      && !isNaN(salaries[keyname]) 
      && salaries[keyname] !== Number.POSITIVE_INFINITY
      && salaries[keyname] !== Number.NEGATIVE_INFINITY
    ) {
      result = result + salaries[keyname];
    }

  }
  return result;
}



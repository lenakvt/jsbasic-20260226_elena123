function showSalary(users, age) {
  let filterdusers = users.filter(user => {
    if (user.age <= age) { return true; }
    return false;
  });

  let balances = filterdusers.map(user => {
    return user.name + ', ' + user.balance;
  });
  return balances.join('\n');
}


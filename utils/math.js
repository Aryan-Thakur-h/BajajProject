function fibonacci(n) {
  let a = 0, b = 1;
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function primesOnly(arr) {
  return arr.filter(isPrime);
}

function hcf(a, b) {
  return b === 0 ? a : hcf(b, a % b);
}

function hcfArray(arr) {
  return arr.reduce((a, b) => hcf(a, b));
}

function lcm(a, b) {
  return (a * b) / hcf(a, b);
}

function lcmArray(arr) {
  return arr.reduce((a, b) => lcm(a, b));
}

module.exports = {
  fibonacci,
  primesOnly,
  hcfArray,
  lcmArray
};

import fs from "node:fs";

const numbersMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const second = async () => {
  const input = String(fs.readFileSync("./inputs/day01.txt"))
    .trim()
    .split("\n");

  const numbers = input.split("\n").map(parseStringNumbers);

  console.log(numbers.reduce((arr, c) => arr + c));
};

const first = async () => {
  const input = String(fs.readFileSync("./inputs/day01.txt")).trim();

  const numbers = input.split("\n").map(parseNumbers);

  console.log(numbers.reduce((arr, c) => arr + c));
};

const parseStringNumbers = (line) => {
  const textNumbers = Object.keys(numbersMap)
    .flatMap((key) => [
      // [numbersMap[key], line.lastIndexOf(key)],
      [numbersMap[key], line.indexOf(key)],
    ])
    .filter(([_, i]) => i >= 0);

  const onlyNumbers = line
    .split("")
    .map((c, i) => [parseInt(c), i])
    .filter(([n]) => !isNaN(n));

  const numbers = [...onlyNumbers, ...textNumbers]
    .slice()
    .sort((a, b) => a[1] - b[1])
    .map(([n]) => n);

  return numbers.at(0) * 10 + numbers.at(-1);
};

const parseNumbers = (line) => {
  const onlyNumbers = line.split("").map(Number).filter(Boolean);

  return onlyNumbers.at(0) * 10 + onlyNumbers.at(-1);
};

// first();
second();

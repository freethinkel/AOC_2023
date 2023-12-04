import fs from "fs";

const second = () => {
  const input = String(fs.readFileSync("./inputs/day04.txt")).trim();
  const lines = input.split("\n");

  const copies = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let [numbers, winningNumbers] = line.split(":")[1].trim().split("|");
    numbers = numbers.trim().split(/\s+/gim).map(Number);
    winningNumbers = winningNumbers.trim().split(/\s+/).map(Number);

    const winningNumbersCount = numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    copies.set(i, (copies.get(i) ?? 0) + 1);

    const repeat = copies.get(i) ?? 1;

    for (let copyIndex = 0; copyIndex < repeat; copyIndex++) {
      for (let j = 1; j <= winningNumbersCount; j++) {
        copies.set(i + j, (copies.get(i + j) ?? 0) + 1);
      }
    }
  }

  const value = Array.from(copies.values()).reduce(
    (acc, curr) => acc + curr,
    0
  );
  console.log(value);
};

const first = () => {
  const input = String(fs.readFileSync("./inputs/day04.txt")).trim();
  const lines = input.split("\n");

  const sum = [];

  for (let line of lines) {
    let [numbers, winningNumbers] = line.split(":")[1].trim().split("|");
    numbers = numbers.trim().split(/\s+/gim).map(Number);
    winningNumbers = winningNumbers.trim().split(/\s+/).map(Number);

    let count = 0;

    for (let number of numbers) {
      if (!winningNumbers.includes(number)) {
        continue;
      }

      if (count === 0) {
        count = 1;
      } else {
        count = count * 2;
      }
    }

    sum.push(count);
  }

  console.log(sum.reduce((acc, curr) => acc + curr));
};

console.time("time");
// first();
second();
console.timeEnd("time");

import fs from "fs";

const main = () => {
  const input = String(fs.readFileSync("./inputs/day09.txt")).trim();
  const lines = input.split("\n").map((line) => line.split(/\s+/).map(Number));

  const newValues = lines.map(findPrevValue);
  const value = newValues.reduce((acc, curr) => acc + curr, 0);
  console.log(value);
};

const findPrevValue = (line) => {
  const newLines = [line];
  while (true) {
    const newLine = getBetweenValues(newLines.at(-1));
    newLines.push(newLine);
    if (newLine.every((e) => e === 0)) {
      break;
    }
  }

  return newLines.reverse().reduce((acc, curr) => curr.at(0) - acc, 0);
};

const getBetweenValues = (line) => {
  const newLine = [];

  for (let i = 1; i < line.length; i++) {
    const curNumber = line[i];
    const prevNumber = line[i - 1];
    newLine.push(curNumber - prevNumber);
  }

  return newLine;
};

main();

import fs from "fs";

const main = () => {
  const input = String(fs.readFileSync("./inputs/day09.txt")).trim();
  const lines = input.split("\n").map((line) => line.split(/\s+/).map(Number));

  const newValues = lines.map(computeNextValueForLine);
  const value = newValues.reduce((acc, curr) => acc + curr, 0);
  console.log(value);
};

const computeNextValueForLine = (line) => {
  const newLines = [line];
  while (true) {
    const newLine = getDiffs(newLines.at(-1));
    newLines.push(newLine);
    if (newLine.every((e) => e === 0)) {
      break;
    }
  }

  return newLines.reduce((acc, curr) => acc + curr.at(-1), 0);
};

const getDiffs = (line) => {
  const newLine = [];

  for (let i = 1; i < line.length; i++) {
    const curNumber = line[i];
    const prevNumber = line[i - 1];
    newLine.push(curNumber - prevNumber);
  }

  return newLine;
};

main();

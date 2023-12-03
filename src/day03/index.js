import fs from "fs";

const POSITIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const getAroundSymbols = (match, lineIndex, lines) => {
  const number = Number(match[0]);
  const startIndex = match.index;
  const endIndex = startIndex + match[0].length - 1;

  return POSITIONS.map((pos) => {
    if (pos[1] === 0) {
      return Array(match[0].length)
        .fill(null)
        .map(
          (_, i) => (lines[lineIndex + pos[0]] ?? "")[startIndex + pos[1] + i]
        )
        .join("");
    }

    return (lines[lineIndex + pos[0]] ?? "")[
      (pos[1] > 0 ? endIndex : startIndex) + pos[1]
    ];
  }).join("");
};

const first = () => {
  const input = String(fs.readFileSync("./inputs/day03.txt"));

  const lines = input.split("\n");
  const numbers = [];

  lines.forEach((line, i) => {
    [...line.matchAll(/\d+/g)].forEach((match) => {
      const symbols = getAroundSymbols(match, i, lines);

      if (!/(^\.+$)/.test(symbols)) {
        numbers.push(Number(match[0]));
      }
    });
  });

  const value = numbers.reduce((acc, curr) => acc + curr, 0);

  console.log(value);
};

const second = () => {
  const input = String(fs.readFileSync("./inputs/day03.txt"));

  const lines = input.split("\n");

  const getNumbersByLine = (i, j) => {
    const line = lines[i] ?? "";
    const numbers = [...line.matchAll(/\d+/g)]
      .filter((match) => j >= match.index && j < match.index + match[0].length)
      .map((e) => Number(e[0]));

    return numbers;
  };

  const numbers = lines
    .map((line, i) => {
      const starPositions = line
        .split("")
        .map((symbol, i) => [symbol, i])
        .filter(([symbol]) => symbol === "*")
        .map(([_, i]) => i);

      return Array.from(
        starPositions.map((index) => {
          const numbers = Array.from(
            new Set(
              POSITIONS.map((pos) =>
                getNumbersByLine(i + pos[0], index + pos[1])
              ).flatMap((e) => e)
            )
          );

          return numbers;
        })
      );
    })
    .flatMap((e) => e)
    .filter((e) => e.length > 1);

  const value = numbers.reduce((acc, curr) => acc + curr[0] * curr[1], 0);

  console.log(value);
};

// first();
second();

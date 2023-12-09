import fs from "fs";

const main = () => {
  const input = String(fs.readFileSync("./inputs/day08.txt")).trim();
  const lines = input.split(/\n/);

  const instructions = lines[0]
    .trim()
    .split("")
    .map((c) => (c === "L" ? 0 : 1));

  const mappings = Object.fromEntries(
    lines.slice(2).map((line) => {
      const [key, sides] = line.split("=").map((e) => e.trim());

      return [
        key,
        sides
          .replace(/\)|\(/gim, "")
          .split(",")
          .map((e) => e.trim()),
      ];
    }),
  );

  const currentKeys = Object.keys(mappings).filter((key) => key[2] === "A");

  const getSteps = (key) => {
    let currentKey = key;
    let step = 0;

    while (currentKey[2] !== "Z") {
      const currentInstruction = instructions[step % instructions.length];
      currentKey = mappings[currentKey][currentInstruction];
      step++;
    }
    return step;
  };

  const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a / gcd(a, b)) * b;

  const value = currentKeys.map(getSteps).reduce(lcm, 1);

  console.log(value);
};

main();

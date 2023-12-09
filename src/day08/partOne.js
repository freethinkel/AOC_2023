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

  let step = 0;
  let currentKey = "AAA";

  while (currentKey !== "ZZZ") {
    const currentInstruction = instructions[step % instructions.length];
    currentKey = mappings[currentKey][currentInstruction];
    step++;
  }

  console.log(step);
};

main();

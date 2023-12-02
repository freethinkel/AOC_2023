import fs from "fs";

const second = () => {
  const input = String(fs.readFileSync("./inputs/day02.txt")).trim();
  const lines = input.split("\n");

  const parsed = lines.map((line) => {
    const [game, variants] = line.split(":");
    const gameVariants = variants.split(";");

    const value = gameVariants.map((games) => {
      return games.split(",").reduce((arr, curr) => {
        const [number, color] = curr.trim().split(" ");
        arr[color] = Number(number);

        return arr;
      }, {});
    });

    return [parseInt(game.split(" ")[1]), value];
  });

  const value = parsed
    .map((game) => {
      const [number, variants] = game;

      const allowed = {
        red: 0,
        green: 0,
        blue: 0,
      };

      variants.forEach((item) => {
        Object.entries(allowed).forEach(([key, value]) => {
          if (item[key] > value) {
            allowed[key] = item[key];
          }
        });
      });

      return Object.values(allowed).reduce((acc, curr) => acc * curr, 1);
    })
    .reduce((acc, curr) => acc + curr, 0);

  console.log(value);
};

const first = () => {
  const input = String(fs.readFileSync("./inputs/day02.txt")).trim();
  const lines = input.split("\n");

  const allowed = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const out = lines.map((line) => {
    const [game, variants] = line.split(":");
    const gameVariants = variants.split(";");

    const value = gameVariants.map((games) => {
      return games.split(",").reduce((arr, curr) => {
        console.log(curr.trim() + "___");
        const [number, color] = curr.trim().split(" ");
        console.log(number, "__", color, arr);
        arr[color] = Number(number);

        return arr;
      }, {});
    });

    return [parseInt(game.split(" ")[1]), value];
  });

  const value = out
    .filter((game) => {
      const [number, variants] = game;

      return !variants.some((item) =>
        Object.entries(allowed).some(([key, value]) => item[key] > value),
      );
    })
    .map(([n]) => n)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(value);
};

// first();
second();

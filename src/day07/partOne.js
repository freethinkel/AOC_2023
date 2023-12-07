import fs from "fs";

const main = () => {
  const input = String(fs.readFileSync("./inputs/day07.txt")).trim();
  const lines = input.split("\n");
  let hands = lines.map(HandStake.parse);

  const pairs = [];
  while (hands.length) {
    const hand = hands.pop();
    const _pairs = hands.filter((item) => item.type === hand.type);

    pairs.push(
      [..._pairs, hand].sort((a, b) => a.value.localeCompare(b.value)),
    );
    hands = hands.filter((e) => e.type !== hand.type);
  }

  let win = 0;
  pairs
    .sort((a, b) => a[0].type - b[0].type)
    .forEach((pair) => {
      pair.forEach((hand) => {
        win++;
        hand.win = win;
      });
    });

  console.log(
    pairs.map((pair) => pair.map((p) => ({ stake: p.stake, type: p.type }))),
  );

  const data = pairs
    .flatMap((e) => e)
    .map((h) => ({ stake: h.stake, win: h.win }))
    .reduce((acc, curr) => acc + curr.stake * curr.win, 0);
  console.log(data);
};

class HandStake {
  win = 1;
  constructor(cards, stake) {
    this._cards = cards;
    const map = [
      "A",
      "K",
      "Q",
      "J",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ].reverse();
    this.cards = cards.split("").map((c) => map.indexOf(c));
    this.type = _getType(this.cards);
    this.value = this.cards
      .map((i) => String.fromCharCode("a".charCodeAt(0) + i))
      .join("");
    this.stake = stake;
  }

  static parse(line) {
    const [cards, stake] = line.split(" ");

    return new HandStake(cards, +stake);
  }
}

const HAND_TYPES = {
  FIVE: 6,
  FOUR: 5,
  FULL_HOUSE: 4,
  THREE: 3,
  TWO: 2,
  ONE: 1,
  NONE: 0,
};

const _getType = (cards) => {
  const sorted = Object.values(
    cards.reduce((acc, curr) => {
      acc[curr] = cards.filter((n) => curr === n).length;
      return acc;
    }, {}),
  )
    .sort()
    .reverse();
  if (sorted[0] === 5) {
    return HAND_TYPES.FIVE;
  }
  if (sorted[0] === 4) {
    return HAND_TYPES.FOUR;
  }
  if (sorted[0] === 3) {
    if (sorted[1] === 2) {
      return HAND_TYPES.FULL_HOUSE;
    }
    return HAND_TYPES.THREE;
  }
  if (sorted[0] === 2) {
    if (sorted[1] === 2) {
      return HAND_TYPES.TWO;
    }
    return HAND_TYPES.ONE;
  }
  return HAND_TYPES.NONE;
};

main();

import 'dart:io';

void main() {
  final input = File("./inputs/day06.txt").readAsStringSync();
  final lines = input.trim().split('\n');

  final times = lines.first
      .split(":")
      .last
      .trim()
      .split(RegExp(r"\s+"))
      .map((n) => int.parse(n))
      .toList();

  final distances = lines.last
      .split(":")
      .last
      .trim()
      .split(RegExp(r"\s+"))
      .map((n) => int.parse(n))
      .toList();

  final variants = times.map((_) => 0).toList();

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    var distance = distances[i];
    for (var j = 0; j <= time; j++) {
      var remainingTime = time - j;
      if (j * remainingTime > distance) {
        variants[i]++;
      }
    }
  }

  final value = variants.reduce((acc, curr) => acc * curr);
  print("VARIANTS: $value");
}

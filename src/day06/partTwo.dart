import 'dart:io';

void main() {
  final input = File("./inputs/day06.txt").readAsStringSync();
  final lines = input.trim().split('\n');

  final time = int.parse(
      lines.first.split(":").last.trim().split(RegExp(r"\s+")).join(""));

  final distance = int.parse(
      lines.last.split(":").last.trim().split(RegExp(r"\s+")).join(""));

  var variants = 0;

  for (var j = 0; j <= time; j++) {
    var remainingTime = time - j;
    if (j * remainingTime > distance) {
      variants++;
    }
  }

  final value = variants;
  print("VARIANTS: $value");
}

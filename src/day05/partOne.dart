import 'dart:io';

main() {
  final input = File("./inputs/day05.txt").readAsStringSync();
  final lines = input.split('\n');
  final seeds =
      lines[0].split(":")[1].trim().split(" ").map((str) => int.parse(str));

  final soils = seeds
      .map((item) => NumbersMap.parse(lines, "seed-to-soil map:").get(item));
  final fertilizers = soils.map(
      (item) => NumbersMap.parse(lines, "soil-to-fertilizer map:").get(item));
  final waters = fertilizers.map(
      (item) => NumbersMap.parse(lines, "fertilizer-to-water map:").get(item));
  final lights = waters
      .map((item) => NumbersMap.parse(lines, "water-to-light map:").get(item));
  final temperatures = lights.map(
      (item) => NumbersMap.parse(lines, "light-to-temperature map:").get(item));
  final humidities = temperatures.map((item) =>
      NumbersMap.parse(lines, "temperature-to-humidity map:").get(item));
  final locations = humidities
      .map((item) =>
          NumbersMap.parse(lines, "humidity-to-location map:").get(item))
      .toList();

  final sortedLocations = [...locations]..sort((a, b) => a - b);
  print(sortedLocations.first);
}

class NumbersMap {
  NumbersMap({
    required this.data,
  });

  List<List<int>> data;

  int get(int number) {
    int? found;
    for (var line in data) {
      final repeat = line[2];
      final source = line[1];
      final target = line[0];
      if (number >= source && number <= source + repeat) {
        found = target + (number - source);
        break;
      }
    }
    return found ?? number;
  }

  static NumbersMap parse(List<String> lines, String header) {
    final startIndex = lines.indexOf(header) + 1;
    var endIndex = startIndex;
    while (lines[endIndex].trim().isNotEmpty) {
      endIndex++;
    }
    final sublist = lines
        .sublist(startIndex, endIndex)
        .map(
          (line) => line
              .trim()
              .split(RegExp(r'\s+'))
              .map(
                (str) => int.parse(str),
              )
              .toList(),
        )
        .toList();

    return NumbersMap(data: sublist);
  }
}

import 'dart:io';

List<({int start, int end})> seedsToRanges(Iterable<int> seeds) {
  final list = <({int start, int end})>[];
  for (var i = 0; i < seeds.length; i += 2) {
    var startRange = seeds.elementAt(i);
    var endRange = startRange + seeds.elementAt(i + 1) - 1;
    list.add((start: startRange, end: endRange));
  }
  return list;
}

void main() {
  final input = File("./inputs/day05.txt").readAsStringSync();
  final lines = input.split('\n');
  final _seeds =
      lines[0].split(":")[1].trim().split(" ").map((str) => int.parse(str));

  final seeds = seedsToRanges(_seeds.toList());

  final categories = [
    NumbersMap.parse(lines, "seed-to-soil map:"),
    NumbersMap.parse(lines, "soil-to-fertilizer map:"),
    NumbersMap.parse(lines, "fertilizer-to-water map:"),
    NumbersMap.parse(lines, "water-to-light map:"),
    NumbersMap.parse(lines, "light-to-temperature map:"),
    NumbersMap.parse(lines, "temperature-to-humidity map:"),
    NumbersMap.parse(lines, "humidity-to-location map:"),
  ];

  int locationToSeed(location) {
    return categories.reversed.fold(location, (previousValue, element) {
      var mapped = element.get(previousValue);
      return mapped;
    });
  }

  var location = 0;
  while (true) {
    final seed = locationToSeed(location);
    if (seeds.any((element) => seed >= element.start && seed <= element.end)) {
      break;
    }
    location++;
  }

  print("LOCATION: $location");
}

class NumbersMap {
  NumbersMap({
    required this.data,
  });

  List<({int destination, int source, int repeat})> data;

  int get(int number) {
    int? finded;
    for (var line in data) {
      if (number >= line.destination &&
          number < line.destination + line.repeat) {
        finded = line.source + (number - line.destination);
        break;
      }
    }
    return finded ?? number;
  }

  static NumbersMap parse(List<String> lines, String header) {
    final startIndex = lines.indexOf(header) + 1;
    var endIndex = startIndex;
    while (lines[endIndex].trim().isNotEmpty) {
      endIndex++;
    }
    final sublist = lines.sublist(startIndex, endIndex).map((line) {
      final numbers = line
          .trim()
          .split(RegExp(r'\s+'))
          .map(
            (str) => int.parse(str),
          )
          .toList();
      return (destination: numbers[0], source: numbers[1], repeat: numbers[2]);
    }).toList();

    return NumbersMap(data: sublist);
  }
}

extension Collection<T> on List<T> {
  T? firstWhereOrNull(bool Function(T) callback) {
    try {
      return firstWhere(callback);
    } catch (err) {
      return null;
    }
  }
}

export class Utils{
  //for shuffling the array
  static shuffleArray<T>(arr: T[]): T[] {
    let n = arr.length;
    while (n) {
      const i = Math.floor(Math.random() * n--);
      [arr[n], arr[i]] = [arr[i], arr[n]];
    }
    return arr;
  }
}
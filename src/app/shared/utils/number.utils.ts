export class NumberUtils {
  static toPrice(value: number | string): string {
    const rounded = Math.round(+value * 100) / 100;
    return parseFloat(rounded.toString()).toFixed(2);
  }
}

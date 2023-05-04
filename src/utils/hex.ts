export default class HexUtils {
  static toHex(number: number) {
    return `0x${number.toString(16)}`;
  }
}

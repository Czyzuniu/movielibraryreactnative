export default class CoreMapper {
  static stringToDate(date: string) {
    return new Date(date);
  }

  static dateToString(date: Date) {
    return date.toISOString();
  }

  static numberToString(num: number) {
    return num.toString();
  }
}

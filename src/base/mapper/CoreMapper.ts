export default class CoreMapper {
  static stringToDate(date: string) {
    return this.stringToDateWithFormat(date);
  }

  static dateToString(date: Date) {
    return date.toISOString();
  }

  static stringToDateWithFormat(date: string) {
    return new Date(date);
  }

  static numberToString(num: number) {
    return num.toString();
  }
}

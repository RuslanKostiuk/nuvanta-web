export class DateUtils {
  static formatDate(date: Date | string | undefined): string | undefined {
    if (!date) {
      return date;
    }

    const {day, month, year} = this.getDateParts(date);
    return `${month}/${day}/${year}`;
  }

  static formatDateForInput(date: Date | string | undefined): string | undefined {
    if (!date) {
      return date;
    }


    const {day, month, year} = this.getDateParts(date);
    return `${year}-${month}-${day}`;
  }

  private static getDateParts(date: Date | string): { day: string, month: string, year: number } {
    const dateObj = new Date(date);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return {day, month, year};
  }
}

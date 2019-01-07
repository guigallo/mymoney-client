class DateUtils {
  static toStringDate(date, lang = 'en') {
    const dateArr = [
      date.getFullYear(),
      twoDigits(date.getMonth() + 1),
      twoDigits(date.getDate())
    ];

    let separator = '';
    switch(lang) {
      case 'en':
        separator = '-';
        break;

      case 'pt-br':
        dateArr.reverse();
        separator = '/';
        break;

      default:
        separator = ' ';
    }

    return dateArr.join(separator);
  }

  static todayToDate() {
    return this.toStringDate(new Date());
  }
}

function twoDigits(number) {
  let numberTwoDigits = number;
  if(number < 10)
    numberTwoDigits = `0${number}`;
  return numberTwoDigits;
}

export default DateUtils;
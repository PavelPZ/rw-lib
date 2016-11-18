import { LangType } from './all-langs'
//************* eviduje formaters is a parametry.
//Vyuzito v designtime pro generaci zkompilovanych formatovacich funkci (d:\rw\rw-lib\glob\*.js) i v runtime pro vlastni formatovani (v d:\rw\rw-lib\glob\globalize.ts)

//Moznosti: https://www.sitepoint.com/how-to-implement-internationalization-i18n-in-javascript/

export interface FormatterOrParserFunction {
  (...args: any[]): any;
}
export type getFormatterFnc = (glob: GlobalizeStatic) => FormatterOrParserFunction;
export type dateFormatter = (value: Date) => string;
export type relativeTimeFormatter = (value: number) => string;
export type numberFormatter = (value: number) => string;

export interface IFormaterFncs {
  dateFull: getFormatterFnc;
  dateLong: getFormatterFnc;
  dateMedium: getFormatterFnc;
  dateShort: getFormatterFnc;
  timeFull: getFormatterFnc;
  timeLong: getFormatterFnc;
  timeMedium: getFormatterFnc;
  timeShort: getFormatterFnc;
  dateTimeFull: getFormatterFnc;
  dateTimeLong: getFormatterFnc;
  dateTimeMedium: getFormatterFnc;
  dateTimeShort: getFormatterFnc;
  number0_0: getFormatterFnc;
  number0_1: getFormatterFnc;
  number1_1: getFormatterFnc;
  number0_2: getFormatterFnc;
  number2_2: getFormatterFnc;
  percent0_0: getFormatterFnc;
  percent0_1: getFormatterFnc;
  percent1_1: getFormatterFnc;
  relHour: getFormatterFnc;
  relDay: getFormatterFnc;
  relMonth: getFormatterFnc;
  relYear: getFormatterFnc;
  relWeek: getFormatterFnc;
}

export interface IFormater {
  locale: LangType; 
  dateFull: dateFormatter;
  dateLong: dateFormatter;
  dateMedium: dateFormatter;
  dateShort: dateFormatter;
  timeFull: dateFormatter;
  timeLong: dateFormatter;
  timeMedium: dateFormatter;
  timeShort: dateFormatter;
  dateTimeFull: dateFormatter;
  dateTimeLong: dateFormatter;
  dateTimeMedium: dateFormatter;
  dateTimeShort: dateFormatter;
  number0_0: numberFormatter;
  number0_1: numberFormatter;
  number1_1: numberFormatter;
  number0_2: numberFormatter;
  number2_2: numberFormatter;
  percent0_0: numberFormatter;
  percent0_1: numberFormatter;
  percent1_1: numberFormatter;
  relHour: relativeTimeFormatter;
  relDay: relativeTimeFormatter;
  relMonth: relativeTimeFormatter;
  relYear: relativeTimeFormatter;
  relWeek: relativeTimeFormatter;
}

export var formaterFncs: IFormaterFncs = {
  dateFull: glob => glob.dateFormatter({ date: "full" }),
  dateLong: glob => glob.dateFormatter({ date: "long" }),
  dateMedium: glob => glob.dateFormatter({ date: "medium" }),
  dateShort: glob => glob.dateFormatter({ date: "short" }),
  timeFull: glob => glob.dateFormatter({ time: "full" }),
  timeLong: glob => glob.dateFormatter({ time: "long" }),
  timeMedium: glob => glob.dateFormatter({ time: "medium" }),
  timeShort: glob => glob.dateFormatter({ time: "short" }),
  dateTimeFull: glob => glob.dateFormatter({ datetime: "full" }),
  dateTimeLong: glob => glob.dateFormatter({ datetime: "long" }),
  dateTimeMedium: glob => glob.dateFormatter({ datetime: "medium" }),
  dateTimeShort: glob => glob.dateFormatter({ datetime: "short" }),
  number0_0: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  number0_1: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 1 }),
  number1_1: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  number0_2: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }),
  number2_2: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  percent0_0: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  percent0_1: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 1 }),
  percent1_1: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  relHour: glob => glob.relativeTimeFormatter("hour"),
  relDay: glob => glob.relativeTimeFormatter("day"),
  relMonth: glob => glob.relativeTimeFormatter("month"),
  relYear: glob => glob.relativeTimeFormatter("year"),
  relWeek: glob => glob.relativeTimeFormatter("week"),
}

//export function getFormater




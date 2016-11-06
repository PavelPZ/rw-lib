export interface FormatterOrParserFunction {
  (...args: any[]): any;
}
export type getFormatterFnc = (glob: GlobalizeStatic) => FormatterOrParserFunction;
export type dateFormatter = (value: Date) => string;
export type numberFormatter = (value: number) => string;

export type TAllLangs = 'cs' | 'de' | 'en';
export var allLangs = [ 'cs' , 'de' , 'en' ];

export interface IFormaterFncs {
  dateFull: getFormatterFnc;
  dateLong: getFormatterFnc;
  dateMedium: getFormatterFnc;
  dateShort: getFormatterFnc;
  number0_0: getFormatterFnc;
  number0_1: getFormatterFnc;
  number1_1: getFormatterFnc;
  number0_2: getFormatterFnc;
  number2_2: getFormatterFnc;
  percent0_0: getFormatterFnc;
  percent0_1: getFormatterFnc;
  percent1_1: getFormatterFnc;
}

export interface IFormater {
  dateFull: dateFormatter;
  dateLong: dateFormatter;
  dateMedium: dateFormatter;
  dateShort: dateFormatter;
  number0_0: numberFormatter;
  number0_1: numberFormatter;
  number1_1: numberFormatter;
  number0_2: numberFormatter;
  number2_2: numberFormatter;
  percent0_0: numberFormatter;
  percent0_1: numberFormatter;
  percent1_1: numberFormatter;
}

export var formaterFncs: IFormaterFncs = {
  dateFull: glob => glob.dateFormatter({ date: "full" }),
  dateLong: glob => glob.dateFormatter({ date: "long" }),
  dateMedium: glob => glob.dateFormatter({ date: "medium" }),
  dateShort: glob => glob.dateFormatter({ date: "short" }),
  number0_0: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  number0_1: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 1 }),
  number1_1: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  number0_2: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 }),
  number2_2: glob => glob.numberFormatter({ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  percent0_0: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  percent0_1: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 1 }),
  percent1_1: glob => glob.numberFormatter({ style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
}

//export function getFormater


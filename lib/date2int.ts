import { globalize } from '../glob/globalize';

//http://stackoverflow.com/questions/1877788/javascript-date-to-c-sharp-via-ajax
var localOffset = new Date().getTimezoneOffset() * 60000;
export function toUtcTime(dt: Date): Date { return new Date(dt.getTime() + localOffset); }


export function nowToInt(): number { return dateToInt(new Date()); } //milivteriny
export function nowToNum(): number { return dateToNum(new Date()); } //vteriny
export function nowToDay(): number { return dayToInt(new Date()); } //dny

export function formatDateLow(dt: Date): string { return globalize.dateMedium(dt); }
export function formatTimeLow(dt: Date): string { return globalize.timeMedium(dt); }

//vteriny
export function dateToNum(dt: Date): number { return Math.floor(dateToInt(dt) / 1000); }
export function numToDate(num: number): Date { return new Date(num * 1000); }
export function formatDate(sec: number) { return formatDateLow(numToDate(sec)); }
export function formatDateTime(sec: number) { return formatDate(sec) + formatTimeLow(numToDate(sec)); }

//miliseconds
export function dateToInt(dt: Date): number { return dt.getTime(); }
export function intToDate(num: number): Date { return new Date(num); }
export function intToDateStr(num: number): string { return formatTimeLow(intToDate(num)); }
export function intToDateStrLong(num: number): string { return globalize.dateLong(intToDate(num)); }

//days
export function dayToInt(dt: Date): number { return Math.floor((dateToInt(dt) + 1) / msecInDay); }
export function intToDay(num: number): Date { return new Date(num * msecInDay); }
//export function formatDay(day: number) { return formatTimeLow(intToDay(day)); }
export function formatDay(day: number) { return formatDateLow(intToDay(day)); }
var msecInDay = 3600 * 24 * 1000;

export function toInt(n: number): number { return Math.floor(n); }
export function formatTimeSpan(secs: number) {
  var s = Math.floor(secs % 60); secs = secs / 60;
  var m = Math.floor(secs % 60);
  var h = Math.floor(secs / 60);
  return (h == 0 ? '' : (h.toString() + ":")) + (m < 10 ? "0" : "") + m.toString() + ":" + (s < 10 ? "0" : "") + s.toString();
}
export function IsTheSameDay(date1: Date, date2: Date): boolean {
  return date1.setHours(0, 0, 0, 0) == date2.setHours(0, 0, 0, 0);
}
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( ["globalize-runtime/number","globalize-runtime/plural","globalize-runtime/date","globalize-runtime/relative-time"], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require("globalize/dist/globalize-runtime/number"), require("globalize/dist/globalize-runtime/plural"), require("globalize/dist/globalize-runtime/date"), require("globalize/dist/globalize-runtime/relative-time") );
	} else {

		// Global
		factory( root.Globalize );
	}
}( this, function( Globalize ) {

var validateParameterTypeNumber = Globalize._validateParameterTypeNumber;
var validateParameterPresence = Globalize._validateParameterPresence;
var numberRound = Globalize._numberRound;
var numberFormat = Globalize._numberFormat;
var numberFormatterFn = Globalize._numberFormatterFn;
var pluralGeneratorFn = Globalize._pluralGeneratorFn;
var validateParameterTypeDate = Globalize._validateParameterTypeDate;
var dateFormat = Globalize._dateFormat;
var dateFormatterFn = Globalize._dateFormatterFn;
var relativeTimeFormatterFn = Globalize._relativeTimeFormatterFn;

Globalize.b1504910100 = numberFormatterFn(["",,1,2,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1403851880 = numberFormatterFn(["",,1,0,0,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a126395188 = numberFormatterFn(["",,1,,,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1403852841 = numberFormatterFn(["",,1,0,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a2096954538 = numberFormatterFn(["",,1,1,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1403853802 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b376385760 = numberFormatterFn(["",,2,,,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b950091532 = numberFormatterFn(["",,1,0,0,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b950090571 = numberFormatterFn(["",,1,0,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b256988874 = numberFormatterFn(["",,1,1,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b505327166 = numberFormatterFn(["",,1,0,3,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1625405296 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.a681689027 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.y, HH:mm:ss","timeSeparator":":"});
Globalize.a995236400 = dateFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy, HH:mm","timeSeparator":":"});
Globalize.a1446348751 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"})}, {"pattern":"d. MMMM y","timeSeparator":":","months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}}});
Globalize.a459303414 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.y","timeSeparator":":"});
Globalize.a586370780 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"})}, {"pattern":"EEEE, d. MMMM y","timeSeparator":":","days":{"E":{"4":{"sun":"Sonntag","mon":"Montag","tue":"Dienstag","wed":"Mittwoch","thu":"Donnerstag","fri":"Freitag","sat":"Samstag"}}},"months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}}});
Globalize.b674505315 = dateFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy","timeSeparator":":"});
Globalize.a2131531579 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"HH:mm:ss zzzz","timeSeparator":":","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b1303457746 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"HH:mm:ss z","timeSeparator":":","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b699853163 = dateFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"HH:mm:ss","timeSeparator":":"});
Globalize.b19160802 = dateFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"HH:mm","timeSeparator":":"});
Globalize.a1748612073 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"EEEE, d. MMMM y 'um' HH:mm:ss zzzz","timeSeparator":":","days":{"E":{"4":{"sun":"Sonntag","mon":"Montag","tue":"Dienstag","wed":"Mittwoch","thu":"Donnerstag","fri":"Freitag","sat":"Samstag"}}},"months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b1686377252 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"d. MMMM y 'um' HH:mm:ss z","timeSeparator":":","months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b1977123468 = relativeTimeFormatterFn(Globalize("de").numberFormatter({}), Globalize("de").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Stunde","relativeTimePattern-count-other":"in {0} Stunden"},"relativeTime-type-past":{"relativeTimePattern-count-one":"vor {0} Stunde","relativeTimePattern-count-other":"vor {0} Stunden"},"relative-type-0":"in dieser Stunde"});
Globalize.b1823551090 = relativeTimeFormatterFn(Globalize("de").numberFormatter({}), Globalize("de").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Tag","relativeTimePattern-count-other":"in {0} Tagen"},"relativeTime-type-past":{"relativeTimePattern-count-one":"vor {0} Tag","relativeTimePattern-count-other":"vor {0} Tagen"},"relative-type--2":"vorgestern","relative-type--1":"gestern","relative-type-0":"heute","relative-type-1":"morgen","relative-type-2":"übermorgen"});
Globalize.b1986132246 = relativeTimeFormatterFn(Globalize("de").numberFormatter({}), Globalize("de").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Monat","relativeTimePattern-count-other":"in {0} Monaten"},"relativeTime-type-past":{"relativeTimePattern-count-one":"vor {0} Monat","relativeTimePattern-count-other":"vor {0} Monaten"},"relative-type--1":"letzten Monat","relative-type-0":"diesen Monat","relative-type-1":"nächsten Monat"});
Globalize.a837450427 = relativeTimeFormatterFn(Globalize("de").numberFormatter({}), Globalize("de").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Jahr","relativeTimePattern-count-other":"in {0} Jahren"},"relativeTime-type-past":{"relativeTimePattern-count-one":"vor {0} Jahr","relativeTimePattern-count-other":"vor {0} Jahren"},"relative-type--1":"letztes Jahr","relative-type-0":"dieses Jahr","relative-type-1":"nächstes Jahr"});
Globalize.b787964572 = relativeTimeFormatterFn(Globalize("de").numberFormatter({}), Globalize("de").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} Woche","relativeTimePattern-count-other":"in {0} Wochen"},"relativeTime-type-past":{"relativeTimePattern-count-one":"vor {0} Woche","relativeTimePattern-count-other":"vor {0} Wochen"},"relative-type--1":"letzte Woche","relative-type-0":"diese Woche","relative-type-1":"nächste Woche"});

return Globalize;

}));

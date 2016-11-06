(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( ["globalize-runtime/number","globalize-runtime/date"], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require("globalize/dist/globalize-runtime/number"), require("globalize/dist/globalize-runtime/date") );
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
var validateParameterTypeDate = Globalize._validateParameterTypeDate;
var dateFormat = Globalize._dateFormat;
var dateFormatterFn = Globalize._dateFormatterFn;

Globalize.a1403852841 = numberFormatterFn(["",,1,0,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b256988874 = numberFormatterFn(["",,1,1,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b950090571 = numberFormatterFn(["",,1,0,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b950091532 = numberFormatterFn(["",,1,0,0,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b376385760 = numberFormatterFn(["",,2,,,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1504910100 = numberFormatterFn(["",,1,2,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1403851880 = numberFormatterFn(["",,1,0,0,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a126395188 = numberFormatterFn(["",,1,,,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a2096954538 = numberFormatterFn(["",,1,1,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1403853802 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b674505315 = dateFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy","timeSeparator":":"});
Globalize.a459303414 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"}),"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.y","timeSeparator":":"});
Globalize.a1446348751 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"})}, {"pattern":"d. MMMM y","timeSeparator":":","months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}}});
Globalize.a586370780 = dateFormatterFn({"1":Globalize("de").numberFormatter({"raw":"0"})}, {"pattern":"EEEE, d. MMMM y","timeSeparator":":","days":{"E":{"4":{"sun":"Sonntag","mon":"Montag","tue":"Dienstag","wed":"Mittwoch","thu":"Donnerstag","fri":"Freitag","sat":"Samstag"}}},"months":{"M":{"4":{"1":"Januar","2":"Februar","3":"März","4":"April","5":"Mai","6":"Juni","7":"Juli","8":"August","9":"September","10":"Oktober","11":"November","12":"Dezember"}}}});

return Globalize;

}));

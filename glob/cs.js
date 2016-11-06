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

Globalize.b1842574054 = numberFormatterFn(["",,1,0,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a791551527 = numberFormatterFn(["",,1,1,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a98449830 = numberFormatterFn(["",,1,0,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a98448869 = numberFormatterFn(["",,1,0,0,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b456369699 = numberFormatterFn(["",,1,2,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b234962737 = numberFormatterFn(["",,2,,,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1842575015 = numberFormatterFn(["",,1,0,0,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a130957221 = numberFormatterFn(["",,1,,,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1149472357 = numberFormatterFn(["",,1,1,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1842573093 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a796614604 = dateFormatterFn({"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy","timeSeparator":":"});
Globalize.b1180619353 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"d. M. y","timeSeparator":":"});
Globalize.a1216709568 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"d. MMMM y","timeSeparator":":","months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}}});
Globalize.a356731597 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"EEEE d. MMMM y","timeSeparator":":","days":{"E":{"4":{"sun":"neděle","mon":"pondělí","tue":"úterý","wed":"středa","thu":"čtvrtek","fri":"pátek","sat":"sobota"}}},"months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}}});

return Globalize;

}));

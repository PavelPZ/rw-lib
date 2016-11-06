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

Globalize.b456369699 = numberFormatterFn(["",,1,2,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1842575015 = numberFormatterFn(["",,1,0,0,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a130957221 = numberFormatterFn(["",,1,,,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1842574054 = numberFormatterFn(["",,1,0,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1149472357 = numberFormatterFn(["",,1,1,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1842573093 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b234962737 = numberFormatterFn(["",,2,,,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a98448869 = numberFormatterFn(["",,1,0,0,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a98449830 = numberFormatterFn(["",,1,0,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a791551527 = numberFormatterFn(["",,1,1,1,,,,3,," %","#,##0 %","-#,##0 % %","-"," %",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b521027023 = numberFormatterFn(["",,1,0,3,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1609705439 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), i = s[0], v0 = !s[1];
  return (n == 1 && v0) ? 'one'
      : ((i >= 2 && i <= 4) && v0) ? 'few'
      : (!v0) ? 'many'
      : 'other';
});
Globalize.a1820803828 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"d. M. y H:mm:ss","timeSeparator":":"});
Globalize.a1309076703 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy H:mm","timeSeparator":":"});
Globalize.a1216709568 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"d. MMMM y","timeSeparator":":","months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}}});
Globalize.b1180619353 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"d. M. y","timeSeparator":":"});
Globalize.a796614604 = dateFormatterFn({"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy","timeSeparator":":"});
Globalize.a356731597 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"})}, {"pattern":"EEEE d. MMMM y","timeSeparator":":","days":{"E":{"4":{"sun":"neděle","mon":"pondělí","tue":"úterý","wed":"středa","thu":"čtvrtek","fri":"pátek","sat":"sobota"}}},"months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}}});
Globalize.a1901892396 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"H:mm:ss zzzz","timeSeparator":":","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+H:mm;-H:mm"});
Globalize.b1533096929 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"H:mm:ss z","timeSeparator":":","gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+H:mm;-H:mm"});
Globalize.a1955191366 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"H:mm:ss","timeSeparator":":"});
Globalize.a1451959117 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"H:mm","timeSeparator":":"});
Globalize.a2035830618 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"EEEE d. MMMM y H:mm:ss zzzz","timeSeparator":":","days":{"E":{"4":{"sun":"neděle","mon":"pondělí","tue":"úterý","wed":"středa","thu":"čtvrtek","fri":"pátek","sat":"sobota"}}},"months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+H:mm;-H:mm"});
Globalize.b1399158707 = dateFormatterFn({"1":Globalize("cs").numberFormatter({"raw":"0"}),"2":Globalize("cs").numberFormatter({"raw":"00"})}, {"pattern":"d. MMMM y H:mm:ss z","timeSeparator":":","months":{"M":{"4":{"1":"ledna","2":"února","3":"března","4":"dubna","5":"května","6":"června","7":"července","8":"srpna","9":"září","10":"října","11":"listopadu","12":"prosince"}}},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+H:mm;-H:mm"});
Globalize.a123437605 = relativeTimeFormatterFn(Globalize("cs").numberFormatter({}), Globalize("cs").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"za {0} hodinu","relativeTimePattern-count-few":"za {0} hodiny","relativeTimePattern-count-many":"za {0} hodiny","relativeTimePattern-count-other":"za {0} hodin"},"relativeTime-type-past":{"relativeTimePattern-count-one":"před {0} hodinou","relativeTimePattern-count-few":"před {0} hodinami","relativeTimePattern-count-many":"před {0} hodiny","relativeTimePattern-count-other":"před {0} hodinami"},"relative-type-0":"tuto hodinu"});
Globalize.b1340149059 = relativeTimeFormatterFn(Globalize("cs").numberFormatter({}), Globalize("cs").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"za {0} den","relativeTimePattern-count-few":"za {0} dny","relativeTimePattern-count-many":"za {0} dne","relativeTimePattern-count-other":"za {0} dní"},"relativeTime-type-past":{"relativeTimePattern-count-one":"před {0} dnem","relativeTimePattern-count-few":"před {0} dny","relativeTimePattern-count-many":"před {0} dne","relativeTimePattern-count-other":"před {0} dny"},"relative-type--2":"předevčírem","relative-type--1":"včera","relative-type-0":"dnes","relative-type-1":"zítra","relative-type-2":"pozítří"});
Globalize.b1293248423 = relativeTimeFormatterFn(Globalize("cs").numberFormatter({}), Globalize("cs").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"za {0} měsíc","relativeTimePattern-count-few":"za {0} měsíce","relativeTimePattern-count-many":"za {0} měsíce","relativeTimePattern-count-other":"za {0} měsíců"},"relativeTime-type-past":{"relativeTimePattern-count-one":"před {0} měsícem","relativeTimePattern-count-few":"před {0} měsíci","relativeTimePattern-count-many":"před {0} měsíce","relativeTimePattern-count-other":"před {0} měsíci"},"relative-type--1":"minulý měsíc","relative-type-0":"tento měsíc","relative-type-1":"příští měsíc"});
Globalize.b1356955796 = relativeTimeFormatterFn(Globalize("cs").numberFormatter({}), Globalize("cs").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"za {0} rok","relativeTimePattern-count-few":"za {0} roky","relativeTimePattern-count-many":"za {0} roku","relativeTimePattern-count-other":"za {0} let"},"relativeTime-type-past":{"relativeTimePattern-count-one":"před {0} rokem","relativeTimePattern-count-few":"před {0} lety","relativeTimePattern-count-many":"před {0} roku","relativeTimePattern-count-other":"před {0} lety"},"relative-type--1":"minulý rok","relative-type-0":"tento rok","relative-type-1":"příští rok"});
Globalize.a1312596501 = relativeTimeFormatterFn(Globalize("cs").numberFormatter({}), Globalize("cs").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"za {0} týden","relativeTimePattern-count-few":"za {0} týdny","relativeTimePattern-count-many":"za {0} týdne","relativeTimePattern-count-other":"za {0} týdnů"},"relativeTime-type-past":{"relativeTimePattern-count-one":"před {0} týdnem","relativeTimePattern-count-few":"před {0} týdny","relativeTimePattern-count-many":"před {0} týdne","relativeTimePattern-count-other":"před {0} týdny"},"relative-type--1":"minulý týden","relative-type-0":"tento týden","relative-type-1":"příští týden"});

return Globalize;

}));

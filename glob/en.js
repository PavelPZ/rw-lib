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

Globalize.b940322364 = numberFormatterFn(["",,1,2,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1968439616 = numberFormatterFn(["",,1,0,0,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1378886668 = numberFormatterFn(["",,1,,,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1968440577 = numberFormatterFn(["",,1,0,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1633425022 = numberFormatterFn(["",,1,1,1,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1968441538 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b203855544 = numberFormatterFn(["",,2,,,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b385503796 = numberFormatterFn(["",,1,0,0,,,,3,,"%","#,##0%","-#,##0%%","-","%",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b385502835 = numberFormatterFn(["",,1,0,1,,,,3,,"%","#,##0%","-#,##0%%","-","%",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a307598862 = numberFormatterFn(["",,1,1,1,,,,3,,"%","#,##0%","-#,##0%%","-","%",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b468386326 = numberFormatterFn(["",,1,0,3,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1662346136 = pluralGeneratorFn(function(n) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.b1998581093 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"MMM d, y, h:mm:ss a","timeSeparator":":","months":{"M":{"3":{"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"}}},"dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"}});
Globalize.b753791912 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"M/d/yy, h:mm a","timeSeparator":":","dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"}});
Globalize.a218160295 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"})}, {"pattern":"MMMM d, y","timeSeparator":":","months":{"M":{"4":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}}}});
Globalize.a1286203598 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"})}, {"pattern":"MMM d, y","timeSeparator":":","months":{"M":{"3":{"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul","8":"Aug","9":"Sep","10":"Oct","11":"Nov","12":"Dec"}}}});
Globalize.b93641787 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"M/d/yy","timeSeparator":":"});
Globalize.b641817676 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"})}, {"pattern":"EEEE, MMMM d, y","timeSeparator":":","days":{"E":{"4":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}}},"months":{"M":{"4":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}}}});
Globalize.a903343123 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"h:mm:ss a zzzz","timeSeparator":":","dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.a1763321094 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"h:mm:ss a z","timeSeparator":":","dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.a127047021 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"h:mm:ss a","timeSeparator":":","dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"}});
Globalize.a561702726 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"h:mm a","timeSeparator":":","dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"}});
Globalize.a1830739137 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"EEEE, MMMM d, y 'at' h:mm:ss a zzzz","timeSeparator":":","days":{"E":{"4":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}}},"months":{"M":{"4":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}}},"dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b1604250188 = dateFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"MMMM d, y 'at' h:mm:ss a z","timeSeparator":":","months":{"M":{"4":{"1":"January","2":"February","3":"March","4":"April","5":"May","6":"June","7":"July","8":"August","9":"September","10":"October","11":"November","12":"December"}}},"dayPeriods":{"midnight":"midnight","am":"AM","am-alt-variant":"am","noon":"noon","pm":"PM","pm-alt-variant":"pm","morning1":"in the morning","afternoon1":"in the afternoon","evening1":"in the evening","night1":"at night"},"gmtFormat":"GMT{0}","gmtZeroFormat":"GMT","tzLongHourFormat":"+HH:mm;-HH:mm"});
Globalize.b1108782004 = relativeTimeFormatterFn(Globalize("en").numberFormatter({}), Globalize("en").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} hour","relativeTimePattern-count-other":"in {0} hours"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} hour ago","relativeTimePattern-count-other":"{0} hours ago"},"relative-type-0":"this hour"});
Globalize.b687161418 = relativeTimeFormatterFn(Globalize("en").numberFormatter({}), Globalize("en").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} day","relativeTimePattern-count-other":"in {0} days"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} day ago","relativeTimePattern-count-other":"{0} days ago"},"relative-type--1":"yesterday","relative-type-0":"today","relative-type-1":"tomorrow"});
Globalize.b837350638 = relativeTimeFormatterFn(Globalize("en").numberFormatter({}), Globalize("en").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} month","relativeTimePattern-count-other":"in {0} months"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} month ago","relativeTimePattern-count-other":"{0} months ago"},"relative-type--1":"last month","relative-type-0":"this month","relative-type-1":"next month"});
Globalize.a1705791891 = relativeTimeFormatterFn(Globalize("en").numberFormatter({}), Globalize("en").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} year","relativeTimePattern-count-other":"in {0} years"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} year ago","relativeTimePattern-count-other":"{0} years ago"},"relative-type--1":"last year","relative-type-0":"this year","relative-type-1":"next year"});
Globalize.a80376892 = relativeTimeFormatterFn(Globalize("en").numberFormatter({}), Globalize("en").pluralGenerator({}), {"relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} week","relativeTimePattern-count-other":"in {0} weeks"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} week ago","relativeTimePattern-count-other":"{0} weeks ago"},"relative-type--1":"last week","relative-type-0":"this week","relative-type-1":"next week"});

return Globalize;

}));

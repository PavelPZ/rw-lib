System.register(['./formaters', "globalize-runtime"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var formaters_1, globalize_runtime_1;
    var globalize, actLoc;
    function globalizeInit(loc) {
        if (actLoc == loc)
            return;
        var glob = new globalize_runtime_1.default(loc);
        actLoc = loc;
        exports_1("globalize", globalize = {});
        for (var p in formaters_1.formaterFncs)
            globalize[p] = formaters_1.formaterFncs[p](glob);
    }
    exports_1("globalizeInit", globalizeInit);
    return {
        setters:[
            function (formaters_1_1) {
                formaters_1 = formaters_1_1;
            },
            function (globalize_runtime_1_1) {
                globalize_runtime_1 = globalize_runtime_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFHVyxTQUFTLEVBT2hCLE1BQU07SUFOVix1QkFBOEIsR0FBYztRQUMxQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUFHLElBQUksMkJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDNUMsdUJBQUEsU0FBUyxHQUFHLEVBQVMsQ0FBQSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFZLENBQUM7WUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsd0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBTEQseUNBS0MsQ0FBQTs7Ozs7Ozs7OztZQUNrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdGVyRm5jcywgSUZvcm1hdGVyRm5jcywgSUZvcm1hdGVyLCBUQWxsTGFuZ3MgfSBmcm9tICcuL2Zvcm1hdGVycyc7XHJcbmltcG9ydCBHbG9iYWxpemUgZnJvbSBcImdsb2JhbGl6ZS1ydW50aW1lXCI7XHJcblxyXG5leHBvcnQgbGV0IGdsb2JhbGl6ZTogSUZvcm1hdGVyO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsaXplSW5pdChsb2M6IFRBbGxMYW5ncykge1xyXG4gIGlmIChhY3RMb2MgPT0gbG9jKSByZXR1cm47XHJcbiAgbGV0IGdsb2IgPSBuZXcgR2xvYmFsaXplKGxvYyk7IGFjdExvYyA9IGxvYztcclxuICBnbG9iYWxpemUgPSB7fSBhcyBhbnk7XHJcbiAgZm9yICh2YXIgcCBpbiBmb3JtYXRlckZuY3MpIGdsb2JhbGl6ZVtwXSA9IGZvcm1hdGVyRm5jc1twXShnbG9iKTtcclxufVxyXG5sZXQgYWN0TG9jOiBzdHJpbmc7XHJcbiJdfQ==
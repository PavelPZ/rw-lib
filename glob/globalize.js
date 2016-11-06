System.register(['./formaters', "globalize-runtime"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var formaters_1, globalize_runtime_1;
    var globalize, actLoc;
    //inicializace jazyka lokalizace
    function globalizeInit(loc) {
        if (actLoc == loc)
            return;
        var glob = new globalize_runtime_1.default(loc);
        actLoc = loc;
        exports_1("globalize", globalize = {});
        for (var p in formaters_1.formaterFncs)
            globalize[p] = formaters_1.formaterFncs[p](glob); //priprav funkce
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFVVyxTQUFTLEVBU2hCLE1BQU07SUFQVixnQ0FBZ0M7SUFDaEMsdUJBQThCLEdBQWM7UUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLDJCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQzVDLHVCQUFBLFNBQVMsR0FBRyxFQUFTLENBQUEsQ0FBQztRQUN0QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSx3QkFBWSxDQUFDO1lBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLHdCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7SUFDcEYsQ0FBQztJQUxELHlDQUtDLENBQUE7Ozs7Ozs7Ozs7WUFDa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXRlckZuY3MsIElGb3JtYXRlckZuY3MsIElGb3JtYXRlciwgVEFsbExhbmdzIH0gZnJvbSAnLi9mb3JtYXRlcnMnO1xyXG5pbXBvcnQgR2xvYmFsaXplIGZyb20gXCJnbG9iYWxpemUtcnVudGltZVwiO1xyXG5cclxuLy8qKioqKioqKioqKioqIFJ1bnRpbWUgcHJvIGdsb2JhbGl6YWNpXHJcbi8vYWxsTG9jcygpOyAvL3ZvbGFuYSBwb3V6ZSBqZWRub3UgcHJpIHN0YXJ0dSBhcGxpa2FjZVxyXG4vL2dsb2JhbGl6ZUluaXQoJ2NzJyk7IC8vZGVmaW5pY2UgamF6eWthIGxva2FsaXphY2UsIHZvbGFubyBwcmkgc3RhcnR1IGFwbGlrYWNlIChkaWZvdG5pIGphenlrKSBhIHBybyB6bWVuZSBsb2thbGl6YWNlXHJcbi8vZ2xvYmFsaXplLmRhdGVGdWxsKG5ldyBEYXRlKCkpOyAvL3BvdXppdGkgZm9ybWF0ZXJ1XHJcbi8vKioqKioqKioqKioqKlxyXG5cclxuLy9zZXpuYW0gcHJlZGtvbXBpbG92YW55Y2ggZm9ybWF0b3ZhY2ljaCBmdW5rY2lcclxuZXhwb3J0IGxldCBnbG9iYWxpemU6IElGb3JtYXRlcjtcclxuXHJcbi8vaW5pY2lhbGl6YWNlIGphenlrYSBsb2thbGl6YWNlXHJcbmV4cG9ydCBmdW5jdGlvbiBnbG9iYWxpemVJbml0KGxvYzogVEFsbExhbmdzKSB7XHJcbiAgaWYgKGFjdExvYyA9PSBsb2MpIHJldHVybjtcclxuICBsZXQgZ2xvYiA9IG5ldyBHbG9iYWxpemUobG9jKTsgYWN0TG9jID0gbG9jO1xyXG4gIGdsb2JhbGl6ZSA9IHt9IGFzIGFueTtcclxuICBmb3IgKHZhciBwIGluIGZvcm1hdGVyRm5jcykgZ2xvYmFsaXplW3BdID0gZm9ybWF0ZXJGbmNzW3BdKGdsb2IpOyAvL3ByaXByYXYgZnVua2NlXHJcbn1cclxubGV0IGFjdExvYzogc3RyaW5nO1xyXG4iXX0=
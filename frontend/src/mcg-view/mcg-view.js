var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var McgView = (function () {
    function McgView() {
    }
    McgView.prototype.onClick = function (row) { row["name"] = "blah"; };
    McgView = __decorate([
        angular2_1.Component({
            selector: 'mcg-view',
            inputs: ['config: config']
        }),
        angular2_1.View({
            templateUrl: './src/mcg-view/mcg-view.html',
            directives: [angular2_1.NgFor, McgView, angular2_1.NgIf]
        })
    ], McgView);
    return McgView;
})();
exports.McgView = McgView;

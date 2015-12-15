var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var mcg_view_1 = require('./mcg-view');
var mcg_config_1 = require('./mcg-config');
var home_1 = require('../home/home');
var McgViewDemo = (function () {
    function McgViewDemo(router) {
        this.router = router;
        this.home = new home_1.Home(router);
        this.loadConfig();
    }
    McgViewDemo.prototype.loadConfig = function () {
        //console.log("SHIT");
        //this.devicegroups = [
        //  {Name:'devicegroup1', Path:'company1'},
        //  {Name:'devicegroup2', Path:'company2'},
        //  {Name:'devicegroup3', Path:'company3'}
        //];
        //  //this needs to come later from services... for now it comes from
        //
        //  var devices = [
        //      {Name:'device1', Path:'android'},
        //      {Name:'device2', Path:'iphone'},
        //      {Name:'device3', Path:'windows'}
        //  ];
        //
        //  //this should come from database
        //  const fall2014 = new McgConfig('Fall 2014',"tree1","tree",[],['image1.jpg','image2.jpg','image3.jpg'],null,null);
        //  const summer2014 = new McgConfig('Summer 2014',"tree2","tree",[],['image10.jpg','image20.jpg','image30.jpg'],null,null);
        //  const tree = new McgConfig('Tree',"tree3","tree",[summer2014,fall2014],[],null,null);
        //
        //  const header = new McgConfig('Header...',"header","header",[],[],null,null);
        //  const list = new McgConfig('List...',"list1","list",[],[],devices,'devicegroups');
        //  const footer = new McgConfig('Footer...',"footer","footer",[],[],null,null);
        //  const app = new McgConfig('Mc Genie Sample 1',"app","app",[header,list,footer],[],null,null);
        this.config = new mcg_config_1.McgConfig('App', "app", "app", [], [], null, null);
        ;
        console.log(JSON.stringify(this.config));
        var self = this;
        var callback = function (data) {
            console.log("Return nice from call  " + JSON.stringify(data.data));
            self.config = self.hydrateConfig(data.data[0]);
            self.loadConfigData(self.config);
        };
        this.home._callApi3(callback, 'Secured', 'http://localhost:3001/api/protected/getconfig');
    };
    McgViewDemo.prototype.hydrateConfig = function (cd) {
        console.log("starting  hydrate " + JSON.stringify(cd));
        //constructor(public name:string,
        //  public id:string,
        //  public type:string,
        //  public configs:Array<McgConfig>,
        //  public files:Array<string>,
        //  public data,
        //  public source:string) {
        //}
        var config = new mcg_config_1.McgConfig(cd.name, cd.id, cd.type, [], cd.files, cd.data, cd.source);
        if (cd.configs) {
            for (var c = 0; c < cd.configs.length; c++) {
                var conf = this.hydrateConfig(cd.configs[c]);
                config.configs.push(conf);
            }
        }
        console.log("returning " + JSON.stringify(config));
        return config;
    };
    McgViewDemo.prototype.loadConfigData = function (config) {
        console.log("start load config data name: " + config.name + " source: " + config.source);
        if (config.source) {
            console.log("start load actual data name: " + config.name + " source: " + config.source);
            //calling api (home) typeSecured url: http://localhost:3001/api/protected/token
            this.home._callApi2(config, 'Secured', 'http://localhost:3001/api/protected/devicegroups');
        }
        if (config.configs) {
            for (var c = 0; c < config.configs.length; c++) {
                var conf = config.configs[c];
                this.loadConfigData(conf);
            }
        }
    };
    McgViewDemo = __decorate([
        angular2_1.Component({
            template: '<h1>Recursive McgView</h1><mcg-view [config]="config"></mcg-view>',
            directives: [angular2_1.NgFor, mcg_view_1.McgView, angular2_1.NgIf]
        })
    ], McgViewDemo);
    return McgViewDemo;
})();
exports.McgViewDemo = McgViewDemo;

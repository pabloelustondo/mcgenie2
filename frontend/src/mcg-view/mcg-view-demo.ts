import {Component, NgFor,NgIf} from 'angular2/angular2';
import {McgView} from './mcg-view';
import {McgConfig} from './mcg-config';
import {Home} from '../home/home';
import { Router } from 'angular2/router';

@Component({
    template: '<mcg-view [config]="config"></mcg-view>',
    directives: [NgFor,McgView,NgIf]
})

export class McgViewDemo {
    config: McgConfig;
    devicegroups : Array<Object>;
    home: Home;
    constructor(public router:Router){
        this.home = new Home(router);
        var indexOfConfigNumber=window.location.href.indexOf("mcg") + 3;
        var configNumberString = window.location.href.substring(indexOfConfigNumber)
        var configNumber = 0;
        if (configNumberString) {configNumber=parseInt(configNumberString);}
        this.loadConfig(configNumber);
    }

    loadConfig(configNumber:number){

        this.config = new McgConfig('App',"app","app",[],[],null,null,null,null,null,null,null);;
        console.log(JSON.stringify(this.config));

        var self = this;

        var callback = function(data){
          console.log("Return nice from call  " + JSON.stringify(data.data));
          self.config = self.hydrateConfig(data.data[configNumber]);
          self.loadConfigData(self.config);
        };

        this.home._callApi3(callback,'Secured','http://localhost:3001/api/protected/getconfig');
    }

  hydrateConfig(cd){
    console.log("starting  hydrate " + JSON.stringify(cd));
    //constructor(public name:string,
    //  public id:string,
    //  public type:string,
    //  public configs:Array<McgConfig>,
    //  public files:Array<string>,
    //  public data,
    //  public source:string) {
    //}

    var config = new McgConfig(cd.name, cd.id, cd.type, [], cd.files, cd.data, cd.source, cd.mfields,cd.dfields,cd.efields,cd.cfields,cd.actions);

    if (cd.configs){
      for(var c=0; c<cd.configs.length; c++) {
        var conf = this.hydrateConfig(cd.configs[c]);
        config.configs.push(conf);
      }
    }
    console.log("returning " + JSON.stringify(config));
    return config;
  }

  loadConfigData(config){
    console.log("start load config data name: " + config.name +  " source: " +  config.source);

    if (config.source){
      console.log("start load actual data name: " + config.name +  " source: " +  config.source);
      //calling api (home) typeSecured url: http://localhost:3001/api/protected/token
      this.home._callApi2(config,'Secured','http://localhost:3001/api/protected/' + config.source);
    }

    if (config.configs){
      for(var c=0; c<config.configs.length; c++) {
        var conf = config.configs[c];
        this.loadConfigData(conf);
      }
    }
  }



}

import {bootstrap, Component, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Home} from '../home/home';
import { Router } from 'angular2/router';


export class McConfig {
  id: number;
  name: string;
  wish: string;
}

var CONFIGS: McConfig[] = [
  { "id": 11, "name": "Mr. Nice" , "wish":""},
  { "id": 12, "name": "Narco" , "wish":""},
  { "id": 13, "name": "Bombasto" , "wish":""},
  { "id": 14, "name": "Celeritas" , "wish":""},
  { "id": 15, "name": "Magneta" , "wish":""},
  { "id": 16, "name": "RubberMan" , "wish":""},
  { "id": 17, "name": "Dynama" , "wish":""},
  { "id": 18, "name": "Dr IQ" , "wish":""},
  { "id": 19, "name": "Magma" , "wish":""},
  { "id": 20, "name": "Tornado" , "wish":""}
];

var STYLES = [`
  .genie {width:200px; height:200px; float:left}
  .gift {width:60px; height:60px; text-align:center}
  .hand {width:60px; height:40px}
  .configs {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
  .configs li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
  .configs li:hover {color: #369; background-color: #EEE; left: .2em;}
  .configs .badge {
    font-size: small;
    color: white;
    padding: 0.1em 0.7em;
    background-color: #369;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -1px;
  }
  .selected { background-color: #EEE; color: #369; }
  `];

@Component({
    directives: [FORM_DIRECTIVES,CORE_DIRECTIVES],
    styles:STYLES,
    selector: 'mcgenie',
    template: `
    <div><h1 (click)="onClick()">{{title}}</h1>
    </div>
     <!--A-->
     <table>
     <tr><td style="width:350px">
    <div>
        <img class="genie" src="/src/mcgenie/genie.png">&nbsp;&nbsp;
        <input class="addbutton" type="button" value="Add Wish" (click)="onNewConfig()">
    </div>
    </td>
    <td style="width:200px">
     <!--C-->
    <div style="width:300px">
        <h2 (click)="onClick()">You Wishes</h2>
        <ul class="configs">
         <li style="width:290px" *ng-for="#conf of configs" (click)="onSelect(conf)">
           <span class="badge">{{conf.id}}</span> {{conf.name}}
         </li>
        </ul>
    </div>
    </td>
    <td>
    <div>
       <table>
       <tr><td><a target="_blank" href="./mcg{{config.id}}"><img class="gift" src="/src/mcgenie/gift.jpeg"></a></td></tr>
       <tr><td><b style="width:150px">Try "{{config.name}}"</b></td></tr>
       </table>
    </div>
    </td>
    </tr>
    <tr><td colspan="3">
     <!--D-->
    <div style="width:100%">
        <div style="font-weigth:bold;float:left"><input [(ng-model)]="config.name" placeholder="name"></div>
        <input class="savebutton" type="button" value="Save" (click)="onSaveConfig()">
        <div><textarea rows="50" cols="150" [(ng-model)]="config.wish" placeholder="wish"></div>
    </div>
    </table>
    </td></tr>

    `

})

export class McGenie {
    public configs = CONFIGS;
    public title = 'Mc Genie';
    home: Home;  //a bad name I know...
    public config: McConfig = {
    id:0,
    name: "a",
    wish: "a"
    };

  constructor(public router:Router){
    console.log("constructor mcgenia" + window.location.href );
    this.home = new Home(router);
    this.loadConfig();
  }

  loadConfig(){

    var self = this;
    console.log("starting to load configurations");
    var callback = function(data){
      console.log("Return nice from call  " + JSON.stringify(data.data));
      self.config = self.hydrateConfig(data.data[0]);
      self.configs = [];
      for(var c=0; c<data.data.length; c++){
        self.configs.push(self.hydrateConfig(data.data[c]));
      }
    };

    this.home._callApi3(callback,'Secured','http://localhost:3001/api/protected/getconfig');
  }

  hydrateConfig(cd){
    console.log("starting  hydrate " + JSON.stringify(cd));
    var config = new McConfig();
    config.id=cd.id;
    config.name=cd.name;
    config.wish=JSON.stringify(cd,null,2);

    console.log("cconfig,wish", config.wish);
    console.log("returning hydrateConfig " + JSON.stringify(config));
    return config;
  }


    onNewConfig(){
      console.log("New Config called ..will create new config ");

      var self = this;
      var callback = function(data){
        console.log("Return  from call new config " + JSON.stringify(data.data));
        self.config = self.hydrateConfig(data.data.ops[0]);
        console.log("Pushing" + JSON.stringify(self.config));
        self.configs.push(self.config);
      };
      var newconfig = new McConfig();
      newconfig.id=1;
      newconfig.name="new wish";
      newconfig.wish="";

      this.home._callApi4(callback,'Secured','http://localhost:3001/api/protected/postconfig',newconfig,"POST");

    }

  onSaveConfig(){
    console.log("Save Config called ..will save current config ");

    var self = this;
    var callback = function(data){
      console.log("Return  from call save config " + JSON.stringify(data.data));
    };

    this.home._callApi4(callback,'Secured','http://localhost:3001/api/protected/putconfig',this.config.wish, "PUT");

  }

    onClick(){
      console.log("ON CLICK");
      this.configs.push(this.config);
    }

    onSelect(conf){
        console.log("onSelect  " + conf.name);
        this.config = conf;
    }
}

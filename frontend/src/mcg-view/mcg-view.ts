import {Component, View, NgFor,NgIf} from 'angular2/angular2';
import {McgConfig} from './mcg-config';
import {Home} from '../home/home';
import { Router } from 'angular2/router';

var STYLES = [`
  .mcgdiv {border:solid}
  .mcgtable {border:solid}
  .mcgtableth {border:solid}
  .mcgtabletr {border:solid}
  .mcgtabletd {border:solid; padding:2px; margin:2px}
  .mcglargebutton {width:100%; background-color:CornflowerBlue; border:groove}
  .mcgappbar { background-color:#A9B6D7;}
  .mcgheaderbar { background-color:#E5E4DF;}
  .mcglistbar { background-color:#FFFFC2;}
  .mcgfooterbar { background-color:#E5E4DF;}
  `]

@Component({
    selector: 'mcg-view',
    inputs: ['config: config']
})

@View({
    styles: STYLES,
    templateUrl: './src/mcg-view/mcg-view.html',
    directives: [NgFor,McgView,NgIf]
})

export class McgView {
    config: McgConfig;

  home: Home;
  constructor(public router:Router){
    this.home = new Home(router);
  }

    onClick(row) { alert("Row Clicked: " + JSON.stringify(row,null,2)) }

    onDetailsClick(config, row) {
      config["showdetails"]=true;
      for(var f=0; f<config.dfields.length; f++){
        var field = config.dfields[f];
        console.log("field " + field["name"] + "row value" + row[field["name"]]);
        field["value"]=row[field["name"]];
      }
    }

  onDetailsClose(config) {
    config["showdetails"]=false;
  }

    onActionClick(action, row) {
      var data = {};
      data["action"] = action;
      data["DeviceId"] = row["DeviceId"];
      console.log("ACTION CLICKED " + JSON.stringify(action,null,2) + " data: " + JSON.stringify(row,null,2));
      var callback = function(data){
        console.log("Return nice from call ACTION " + JSON.stringify(data,null,2));
        alert("Done from Call to Action");
      };

      this.home._callApi4(callback, 'Secured',"http://localhost:3001/api/protected/devices/action", data , 'POST');
    }
}

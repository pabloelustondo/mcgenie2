import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import { Router } from 'angular2/router';
import { McgViewDemo } from '../mcg-view/mcg-view-demo';

import {status, text} from '../utils/fetch'

let styles = require('./home.css');
let template = require('./home.html');


@Component({
  selector: 'home'
})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Home {
  jwt:string;
  decodedJwt:string;
  response:string;
  api:string;

  constructor(public router:Router) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }

  callGetToken() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/token');
  }

  callGetDeviceGroups() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/devicegroups');
  }

  _callApi(type, url) {
    console.log("calling api (home) type: " + type +  " url: " +  url);
    this.response = null;
    this.api = type;
    window.fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.jwt
        }
      })
      .then(status)
      .then(text)
      .then((response) => {
        this.response = response;
      })
      .catch((error) => {
        this.response = error.message;
      });
  }

  _callApi2(config, type, url) {
    console.log("api2 config: " + config.name + "calling api2 (home) type: " + type +  " url: " +  url);
    this.response = null;
    this.api = type;
    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.jwt
      }
    })
      .then(status)
      .then(text)
      .then((response) => {
        console.log("api2 config: " + config.name + " success api2 (home) type: " + type +  " url: " +  url + " response: " + response);
        config.data = JSON.parse(response);
      })
      .catch((error) => {
        console.log("config: " + config.name + " error api2 (home) type: " + type +  " url: " +  url + " error: " + error);
      });
  }

  _callApi3(callback, type, url) {
    console.log("calling api3" + "calling api2 (home) type: " + type +  " url: " +  url);
    this.response = null;
    this.api = type;
    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.jwt
      }
    })
      .then(status)
      .then(text)
      .then((response) => {
        console.log("calling api3 success api2 (home) type: " + type +  " url: " +  url + " response: " + response);
        callback(JSON.parse(response));
      })
      .catch((error) => {
        console.log("calling api3 error api2 (home) type: " + type +  " url: " +  url + " error: " + error);
      });
  }

  _callApi4(callback, type, url, data, method) {
  console.log("calling api3" + "calling api2 (home) type: " + type +  " url: " +  url);
  this.response = null;
  this.api = type;
    var jsonbody = data;
    if (typeof(data) !== 'string'){
      console.log("API CALL 4 need to stringify data");
        jsonbody = JSON.stringify(data);
    };
  window.fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.jwt
    },
    body:jsonbody
  })
    .then(status)
    .then(text)
    .then((response) => {
      console.log("calling api3 success api2 (home) type: " + type +  " url: " +  url + " response: " + response);
      callback(JSON.parse(response));
    })
    .catch((error) => {
      console.log("calling api3 error api2 (home) type: " + type +  " url: " +  url + " error: " + error);
    });
}

}

import {View, Component} from 'angular2/angular2';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {McgViewDemo} from '../mcg-view/mcg-view-demo';
import {McGenie} from '../mcgenie/mcgenie';

let template = require('./app.html');


@Component({
  selector: 'auth-app'
})
@View({
  template: template,
  directives: [ LoggedInRouterOutlet ]
})
@RouteConfig([
  { path: '/',       redirectTo: '/home' },
  { path: '/mcgenie',    as: 'McGenie',   component: McGenie },
  { path: '/mcg0',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg1',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg2',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg3',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg4',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg5',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg6',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg7',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg8',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg9',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg10',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg11',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg12',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg13',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg14',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg15',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg16',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg17',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg18',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg19',    as: 'Mcg',   component: McgViewDemo },
  { path: '/mcg',    as: 'Mcg',   component: McgViewDemo },
  { path: '/home',   as: 'Home',   component: Home },
  { path: '/login',  as: 'Login',  component: Login },
  { path: '/signup', as: 'Signup', component: Signup }
])
export class App {
  constructor(public router: Router) {
  }
}

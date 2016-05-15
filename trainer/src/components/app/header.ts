import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'header',
  directives: [ROUTER_DIRECTIVES],
  template: `<div class="navbar-header">
                <h1>7 Minute Workout</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li><a [routerLink]="['history']" title="Workout History">History</a></li>
             </ul>`
})
export class Header { }

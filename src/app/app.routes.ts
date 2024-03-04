import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {DrawerComponent} from './drawer/drawer.component'
import { ColorComponent } from './color/color.component';
import { LaunchpadComponent } from './launchpad/launchpad.component';
export const routes: Routes = [
    {
        path:'', title:'home', component:HomeComponent
    },
    {
        path:'launch', title:'launch', component:LaunchpadComponent
    },
    {
        path:'home', title:'home', component:HomeComponent
    },
    {
        path:"drawer", title:'drawer', component:DrawerComponent
    },
    {
        path:"color", title:'drawer', component:ColorComponent
    }
];

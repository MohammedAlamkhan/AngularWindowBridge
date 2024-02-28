import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {DrawerComponent} from './drawer/drawer.component'
import { ColorComponent } from './color/color.component';
export const routes: Routes = [
    {
        path:'', title:'Home', component:HomeComponent
    },
    {
        path:"drawer", title:'drawer', component:DrawerComponent
    },
    {
        path:"color", title:'drawer', component:ColorComponent
    }
];

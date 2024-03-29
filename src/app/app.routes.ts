import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {DrawerComponent} from './drawer/drawer.component'
import { ColorComponent } from './color/color.component';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import { HomeEditorComponent } from './home-editor/home-editor.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SearchComponent } from './search/search.component';
export const routes: Routes = [
    {
        path:'', title:'home', component:LockscreenComponent
    },
    {
        path:'launch', title:'launch', component:LaunchpadComponent
    },
    {
        path:'search', title:'search', component:SearchComponent
    },
    {
        path:'home', title:'home', component:HomeComponent
    },
    {
        path:"drawer", title:'drawer', component:DrawerComponent
    },
    {
        path:"color", title:'drawer', component:ColorComponent
    },
    {
        path:'editor', title:'editor', component:HomeEditorComponent
    },
];

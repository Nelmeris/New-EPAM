import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import {LogoutComponent} from './components/logout/logout.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

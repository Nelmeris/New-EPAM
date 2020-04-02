import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import {LogoutComponent} from './components/logout/logout.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SolutionsComponent} from './components/solutions/solutions.component';
import {ServiceComponent} from './components/service/service.component';
import {AboutCompanyComponent} from './components/about-company/about-company.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoginGuard} from './guards/login.guard';
import {AccountPanelGuard} from './guards/account-panel.guard';
import {RuleListComponent} from "./components/rule-list/rule-list.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {OrderListComponent} from "./components/order-list/order-list.component";


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/orders', component: OrderListComponent },
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/rules', component: RuleListComponent },
  { path: 'login', component: AuthComponent, canActivate: [ LoginGuard ] },
  { path: 'service', component: ServiceComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'about', component: AboutCompanyComponent },
  { path: 'lk', component: ProfileComponent , canActivate: [ AccountPanelGuard ]},
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

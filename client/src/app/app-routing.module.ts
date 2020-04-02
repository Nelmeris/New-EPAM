import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import {LogoutComponent} from './services/logout/logout.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {SolutionsComponent} from './pages/solutions/solutions.component';
import {ServiceComponent} from './pages/service/service.component';
import {AboutCompanyComponent} from './pages/about-company/about-company.component';
import {AuthComponent} from './pages/auth/auth.component';
import {LoginGuard} from './guards/login.guard';
import {AccountPanelGuard} from './guards/account-panel.guard';
import {RuleListComponent} from "./pages/rule-list/rule-list.component";
import {UserListComponent} from "./pages/user-list/user-list.component";
import {OrderListComponent} from "./pages/order-list/order-list.component";
import {OrderCardComponent} from "./components/order-card/order-card.component";


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/orders', component: OrderListComponent },
  { path: 'admin/orders/:id', component: OrderCardComponent },
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/users/:id', component: ProfileComponent },
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

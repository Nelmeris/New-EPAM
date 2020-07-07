import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LogoutComponent } from './services/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { ServiceComponent } from './pages/service/service.component';
import { AboutCompanyComponent } from './pages/about-company/about-company.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginGuard } from './guards/auth/login.guard';
import { AccountPanelGuard } from './guards/account-panel/account-panel.guard';
import { RuleListComponent } from './pages/rule-list/rule-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { AdminPanelGuard } from './guards/admin-panel/admin-panel.guard';
import { AdminOrdersGuard } from './guards/admin-panel/admin-orders.guard';
import { AdminRulesGuard } from './guards/admin-panel/admin-rules.guard';
import { AdminUsersGuard } from './guards/admin-panel/admin-users.guard';
import { OrderManagementComponent } from './pages/order-management/order-management.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [ AdminPanelGuard ], children: [
      { path: 'orders', component: OrderListComponent, canActivate: [ AdminOrdersGuard ] },
      { path: 'orders/:id', component: OrderManagementComponent, canActivate: [ AdminOrdersGuard ] },
      { path: 'users', component: UserListComponent, canActivate: [ AdminUsersGuard ] },
      { path: 'users/:id', component: ProfileComponent, canActivate: [ AdminUsersGuard ] },
      { path: 'rules', component: RuleListComponent, canActivate: [ AdminRulesGuard ] }
  ]},
  { path: 'login', component: AuthComponent, canActivate: [ LoginGuard ] },
  { path: 'service', component: ServiceComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'about', component: AboutCompanyComponent },
  { path: 'lk', component: ProfileComponent , canActivate: [ AccountPanelGuard ]},
  { path: 'logout', component: LogoutComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

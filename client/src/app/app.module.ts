import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './services/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { ServiceComponent } from './pages/service/service.component';
import { AboutCompanyComponent } from './pages/about-company/about-company.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RuleListComponent } from './pages/rule-list/rule-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { UserByTypePipe } from './pipes/user-by-type.pipe';
import { AddRuleFormComponent } from './components/add-rule-form/add-rule-form.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserTypeForRulePipe } from './pipes/user-type-for-rule.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    AuthFormComponent,
    HeaderComponent,
    MainComponent,
    LogoutComponent,
    FooterComponent,
    ProfileComponent,
    SolutionsComponent,
    ServiceComponent,
    AboutCompanyComponent,
    AuthComponent,
    RuleListComponent,
    UserListComponent,
    OrderListComponent,
    UserByTypePipe,
    AddRuleFormComponent,
    CreateUserFormComponent,
    OrderFormComponent,
    OrderCardComponent,
    UserCardComponent,
    UserTypeForRulePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { ServiceComponent } from './components/service/service.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';
import { AuthComponent } from './components/auth/auth.component';
import { RuleListComponent } from './components/rule-list/rule-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserByTypePipe } from './pipes/user-by-type.pipe';
import { AddRuleFormComponent } from './components/add-rule-form/add-rule-form.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';

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
    UserCardComponent
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

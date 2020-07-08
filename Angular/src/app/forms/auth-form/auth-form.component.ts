import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';
import { Md5 } from 'ts-md5';
import { UserGraphQLService } from 'src/app/services/graph-ql/user-graph-ql.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private checkRuleService: CheckRuleService,
    private userGraphQLService: UserGraphQLService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  async onAuth() {
    const email = this.form.value.email;
    const password = Md5.hashStr(this.form.value.password);
    const user = await this.userGraphQLService.getUserByEmail(email);
    if (user && user.password === password &&
        ((this.router.url.startsWith('/login') && await this.checkRuleService.accountPanel(user)) ||
        (this.router.url.startsWith('/admin') && await this.checkRuleService.adminPanel(user)))) {
      this.authService.setAuth(user);
      window.location.reload();
    } else {
      this.form.controls.password.setValue(null);
    }
  }

}
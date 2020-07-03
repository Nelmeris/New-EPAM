import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../../services/data-base/data-base.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  form: FormGroup;

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private dataBaseService: DataBaseService,
              private authService: AuthService,
              private checkRuleService: CheckRuleService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  async onAuth() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const user = await this.dataBaseService.getUserByEmail(email);
    if (user && user.password === password &&
        ((this.router.url === '/login' && await this.checkRuleService.accountPanel(user)) ||
        (this.router.url === '/admin' && await this.checkRuleService.adminPanel(user)))) {
      this.authService.setAuth(user);
      window.location.reload();
    } else {
      this.form.controls.password.setValue(null);
    }
  }

}

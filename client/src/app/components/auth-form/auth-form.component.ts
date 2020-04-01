import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../../services/data-base.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
              private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
    activatedRouter.params.subscribe(param => {
      if (param.email) {
        this.form.value.email = param.email;
      }
    });
  }

  async onAuth() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const user = await this.dataBaseService.getUserByEmail(email);
    if (user && user.password === password) {
      this.authService.setAuth(user);
    }
  }

  get emailInput() { return this.form.get('email'); }
  get passwordInput() { return this.form.get('password'); }

}

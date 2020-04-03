import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { CheckRuleService } from '../../services/check-rule/check-rule.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private checkRuleService: CheckRuleService) { }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (async () => {
      const user = await this.authService.getAuthUser();
      if (user && await this.checkRuleService.adminPanel(user) || !user) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    })();
  }

}

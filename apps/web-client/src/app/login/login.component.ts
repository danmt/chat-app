import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../core/state';
import { LoginPageActions } from './actions';

@Component({
  selector: 'wc-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userGroup = this.fb.group({
    username: ['', [Validators.required]],
  });

  constructor(private store: Store<fromApp.State>, private fb: FormBuilder) {}

  onLogin() {
    if (this.userGroup.invalid) {
      return;
    }

    this.store.dispatch(LoginPageActions.login(this.userGroup.value));
  }
}

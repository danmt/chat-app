import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

import * as fromApp from '../state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.State>) {}

  canActivate() {
    return this.store.select(fromApp.selectAuth).pipe(
      take(1),
      map((user) => !!user),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}

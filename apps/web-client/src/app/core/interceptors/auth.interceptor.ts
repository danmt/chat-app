import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import * as fromApp from '../state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<fromApp.State>) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromApp.selectAuth).pipe(
      take(1),
      mergeMap((user) => {
        if (user) {
          return next.handle(
            httpRequest.clone({ setHeaders: { id: user._id } })
          );
        } else if (this.router.url === '/login') {
          return next.handle(httpRequest);
        }
        return EMPTY;
      })
    );
  }
}

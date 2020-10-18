import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
          canActivate: [AuthGuard],
        },
        {
          path: 'login',
          loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

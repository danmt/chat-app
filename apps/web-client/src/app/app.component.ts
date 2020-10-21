import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private socketService: Socket) {
    this.socketService.connect();
  }
}

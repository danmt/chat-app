import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private socket: Socket) {
    this.socket.connect();
  }
}

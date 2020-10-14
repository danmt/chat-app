import { Component } from '@angular/core';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  chats = [
    {
      contact: {
        name: 'Sample name 1',
        thumbnail: 'asd.jpg',
      },
      lastMessage: {
        body: 'asdasd asdasd adsas',
        date: new Date(Date.now()),
      },
    },
    {
      contact: {
        name: 'Sample name 2',
        thumbnail: 'asd.jpg',
      },
      lastMessage: {
        body: 'asdasd asdasd adsas',
        date: new Date(Date.now()),
      },
    },
  ];
}

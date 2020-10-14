import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  chats = [
    {
      contact: {
        name: 'Daniel M',
        thumbnail: 'asd.jpg',
      },
      lastMessage: {
        body: 'asdasd asdasd adsas',
        date: new Date(Date.now()),
      },
    },
    {
      contact: {
        name: 'John Smith',
        thumbnail: 'asd.jpg',
      },
      lastMessage: {
        body: 'asdasd asdasd adsas asdasd asdasd adsas asdasd asdasd adsas',
        date: new Date(Date.now()),
      },
    },
    {
      contact: {
        name: 'Bill Clinton',
        thumbnail: 'asd.jpg',
      },
      lastMessage: {
        body: 'asdasd asdasd adsas asdasd asdasd adsas asdasd asdasd adsas',
        date: new Date(Date.now()),
      },
    },
  ];
}

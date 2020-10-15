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
  chat = {
    receiver: {
      name: 'Juanita',
      thumbnail: 'asd.jpg',
    },
    messages: [
      {
        body: 'Hola',
        date: new Date(Date.now()),
        authorId: 0,
      },
      {
        body: 'Como estas?',
        date: new Date(Date.now()),
        authorId: 0,
      },
      {
        body: 'Todo bien y tu?',
        date: new Date(Date.now()),
        authorId: 1,
      },
      {
        body: 'Aqui...',
        date: new Date(Date.now()),
        authorId: 0,
      },
      {
        body: 'Y eso?',
        date: new Date(Date.now()),
        authorId: 1,
      },
      {
        body: 'Acabo de recordar....',
        date: new Date(Date.now()),
        authorId: 1,
      },
      {
        body: 'BOOOOOOOOOOOOORING',
        date: new Date(Date.now()),
        authorId: 1,
      },
      {
        body: 'Que bicho',
        date: new Date(Date.now()),
        authorId: 0,
      },
      {
        body: 'Llora puessssss',
        date: new Date(Date.now()),
        authorId: 1,
      },
    ],
  };
}

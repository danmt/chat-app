import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wc-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() receiver: any;

  constructor() {}

  ngOnInit(): void {}
}

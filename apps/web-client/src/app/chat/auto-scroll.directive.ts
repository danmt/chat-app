import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[wcAutoScroll]' })
export class AutoScrollDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.scrollIntoView();
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wc-thumbnail',
  template: `
    <figure
      class="rounded-full border-black border-2 overflow-hidden"
      style="width: 50px; height: 50px;"
    >
      <img [src]="url" alt="" class="w-full h-full object-cover" />
    </figure>
  `,
})
export class ThumbnailComponent implements OnInit {
  @Input() url!: string | null;

  ngOnInit() {
    if (!this.url) {
      this.url = 'assets/img/avatar.webp';
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoScrollDirective } from './directives/auto-scroll.directive';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';

@NgModule({
  declarations: [AutoScrollDirective, ThumbnailComponent],
  imports: [CommonModule],
  exports: [AutoScrollDirective, ThumbnailComponent],
})
export class SharedModule {}

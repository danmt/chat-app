import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoScrollDirective } from './directives/auto-scroll.directive';

@NgModule({
  declarations: [AutoScrollDirective],
  imports: [CommonModule],
  exports: [AutoScrollDirective],
})
export class SharedModule {}

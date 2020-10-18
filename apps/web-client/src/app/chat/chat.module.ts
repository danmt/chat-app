import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { AutoScrollDirective } from './auto-scroll.directive';

@NgModule({
  declarations: [ChatComponent, AutoScrollDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ChatComponent],
})
export class ChatModule {}

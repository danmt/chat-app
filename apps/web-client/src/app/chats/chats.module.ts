import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChatsComponent } from './chats.component';

@NgModule({
  imports: [CommonModule],
  exports: [ChatsComponent],
  declarations: [ChatsComponent],
})
export class ChatsModule {}

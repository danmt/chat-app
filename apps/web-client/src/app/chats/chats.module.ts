import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChatsComponent } from './chats.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [ChatsComponent],
  declarations: [ChatsComponent],
})
export class ChatsModule {}

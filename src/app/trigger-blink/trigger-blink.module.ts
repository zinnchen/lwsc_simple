import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggerBlinkPageRoutingModule } from './trigger-blink-routing.module';

import { TriggerBlinkPage } from './trigger-blink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggerBlinkPageRoutingModule
  ],
  declarations: [TriggerBlinkPage]
})
export class TriggerBlinkPageModule {}

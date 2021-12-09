import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggerBlinkPageRoutingModule } from './trigger-blink-routing.module';

import { TriggerBlinkPage } from './trigger-blink.page';
import { JohannesCustomComponent } from '../components/johannes-custom/johannes-custom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggerBlinkPageRoutingModule
  ],
  declarations: [TriggerBlinkPage, JohannesCustomComponent]
})
export class TriggerBlinkPageModule {}

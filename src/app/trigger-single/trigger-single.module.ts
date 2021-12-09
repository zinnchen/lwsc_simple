import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggerSinglePageRoutingModule } from './trigger-single-routing.module';

import { TriggerSinglePage } from './trigger-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggerSinglePageRoutingModule
  ],
  declarations: [TriggerSinglePage]
})
export class TriggerSinglePageModule {}

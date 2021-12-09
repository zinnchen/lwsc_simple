import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggerTableauPageRoutingModule } from './trigger-tableau-routing.module';

import { TriggerTableauPage } from './trigger-tableau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggerTableauPageRoutingModule
  ],
  declarations: [TriggerTableauPage]
})
export class TriggerTableauPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggerListPageRoutingModule } from './trigger-list-routing.module';

import { TriggerListPage } from './trigger-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggerListPageRoutingModule
  ],
  declarations: [TriggerListPage]
})
export class TriggerListPageModule {}

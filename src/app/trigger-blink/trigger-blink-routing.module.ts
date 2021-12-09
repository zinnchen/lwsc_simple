import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriggerBlinkPage } from './trigger-blink.page';

const routes: Routes = [
  {
    path: '',
    component: TriggerBlinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggerBlinkPageRoutingModule {}

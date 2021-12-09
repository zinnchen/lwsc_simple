import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriggerSinglePage } from './trigger-single.page';

const routes: Routes = [
  {
    path: '',
    component: TriggerSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggerSinglePageRoutingModule {}

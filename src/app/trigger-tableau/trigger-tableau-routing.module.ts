import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriggerTableauPage } from './trigger-tableau.page';

const routes: Routes = [
  {
    path: '',
    component: TriggerTableauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggerTableauPageRoutingModule {}

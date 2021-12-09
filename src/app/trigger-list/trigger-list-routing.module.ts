import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriggerListPage } from './trigger-list.page';

const routes: Routes = [
  {
    path: '',
    component: TriggerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggerListPageRoutingModule {}

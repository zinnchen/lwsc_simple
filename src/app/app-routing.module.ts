import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trigger-blink',
    pathMatch: 'full'
  },
  {
    path: 'trigger-tableau',
    loadChildren: () => import('./trigger-tableau/trigger-tableau.module').then( m => m.TriggerTableauPageModule)
  },
  {
    path: 'trigger-blink',
    loadChildren: () => import('./trigger-blink/trigger-blink.module').then( m => m.TriggerBlinkPageModule)
  },
  {
    path: 'trigger-single',
    loadChildren: () => import('./trigger-single/trigger-single.module').then( m => m.TriggerSinglePageModule)
  },
  {
    path: 'trigger-list',
    loadChildren: () => import('./trigger-list/trigger-list.module').then( m => m.TriggerListPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

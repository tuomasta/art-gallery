import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ArtSearchComponent } from '../art-search/art-search/art-search.component';
import { ArtWorkComponent } from '../art-work/art-work/art-work.component';

const appRoutes: Routes = [
  { path: 'art-works/:id', loadChildren: 'app/art-work/art-work.module#ArtWorkModule'},
  { path: '**', redirectTo: 'art-works', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules // using preload for all modules
    }),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }

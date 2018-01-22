import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtWorkComponent } from './art-work/art-work.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ArtWorkDetailsComponent } from './art-work-details/art-work-details.component';

const appRoutes: Routes = [
  { path: '', component: ArtWorkComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [ArtWorkComponent, ArtWorkDetailsComponent],
  exports: [ArtWorkComponent]
})
export class ArtWorkModule { }

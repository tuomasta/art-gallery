import {SharedModule} from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtListComponent } from './art-list/art-list.component';
import { ArtSearchComponent } from './art-search/art-search.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const searchRoutes: Routes = [
  { path: 'art-gallery', component: ArtSearchComponent},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [ArtListComponent, ArtSearchComponent],
  exports: [ArtSearchComponent]
})
export class ArtSearchModule { }

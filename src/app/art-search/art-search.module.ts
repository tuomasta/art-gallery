import {SharedModule} from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtListComponent } from './art-list/art-list.component';
import { ArtSearchComponent } from './art-search/art-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ArtListComponent, ArtSearchComponent],
  exports: [ArtSearchComponent]
})
export class ArtSearchModule { }

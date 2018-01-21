import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtCollectionService } from './art-collection.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ArtCollectionService]
})
export class SharedModule { }

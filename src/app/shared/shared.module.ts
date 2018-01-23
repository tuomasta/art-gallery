import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtCollectionService } from './art-collection.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [SpinnerComponent],
  providers: [ArtCollectionService],
  exports: [SpinnerComponent]
})
export class SharedModule { }

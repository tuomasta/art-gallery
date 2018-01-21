import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ArtSearchModule } from './art-search/art-search.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ArtSearchModule,
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

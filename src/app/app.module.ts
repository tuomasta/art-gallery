import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ArtSearchModule } from './art-search/art-search.module';
import { RoutingModule } from './routing/routing.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ArtSearchModule,
    BrowserModule,
    RoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

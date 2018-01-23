import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArtWork, ArtCollection } from '../../models/art-collection';
import { LoadingModel } from '../../models/art-work-details';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent {
  @Input() public set artCollection(value: ArtCollection | LoadingModel) {
    if (!value || (<any> value).isLoading) {
      this.onLoading();
      return;
    }

    this.onArtCollectionUptaded(value as ArtCollection);
  }

  @Output() public pageChange = new EventEmitter<number>();

  public page = 1;
  public isLoading = true;
  public artWorks: ArtWork[] = [];
  public numberOfItems = 0;

  public onPageChange(page: number): void {
    this.page = page;
    this.pageChange.emit(page);
  }

  private onLoading() {
    this.page = 1;
    this.artWorks = [];
  }

  private onArtCollectionUptaded(collection: ArtCollection): any {
    this.artWorks = collection.artworks;
    this.isLoading = false;
    this.numberOfItems = collection.totalNumberOfItems;
  }
}

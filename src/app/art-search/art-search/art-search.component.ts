import { ArtCollectionService } from '../../shared/art-collection.service';
import { ArtWork, ArtCollection } from '../../models/art-collection';
import { LoadingModel } from '../../models/art-work-details';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

interface SearchEvent {
  toSearch: string;
  page: number;
}

@Component({
  selector: 'app-art-search',
  templateUrl: './art-search.component.html',
  styleUrls: ['./art-search.component.css']
})
export class ArtSearchComponent  implements OnInit {
  private searchSubject = new BehaviorSubject<string>('');
  private pageSubject = new BehaviorSubject<number>(1);

  public searchModel$: Observable<ArtCollection | LoadingModel>;

  constructor(
    private service: ArtCollectionService,
    private changeDetection: ChangeDetectorRef ) {
  }

  ngOnInit(): void {
    this.searchModel$ = this.searchSubject
      .debounceTime(500)
      .distinctUntilChanged()
      .combineLatest(
        this.pageSubject.distinctUntilChanged(),
        (search, page) => ({
          toSearch: search,
          page: page
        })
      ).switchMap(change => this.service.getSearchModel({
        filter: change.toSearch,
        page: change.page,
        numberOfItems: 10
      }));
  }

  public searchArt(toSearch: string): void {
    this.searchSubject.next(toSearch);
  }

  public onPageChange(page: number): void {
    this.pageSubject.next(page);
  }
}

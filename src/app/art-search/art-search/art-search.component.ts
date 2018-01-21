import {ArtCollectionService} from '../../shared/art-collection.service';
import {ArtItem} from '../../models/art-collection';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/of';

import { SearchModel } from '../../models/search-model';

@Component({
  selector: 'app-art-search',
  templateUrl: './art-search.component.html',
  styleUrls: ['./art-search.component.css']
})
export class ArtSearchComponent  implements OnInit {
  public searchModel$: Observable<SearchModel>;
  public searchSubject = new BehaviorSubject<string>('');
  public isLoading =  false;
  constructor(
    private service: ArtCollectionService,
    private changeDetection: ChangeDetectorRef ) {
  }

  ngOnInit(): void {
    this.searchModel$ = this.searchSubject
      .debounceTime(500)
      .distinctUntilChanged()
      .mergeMap(toSearch => this.service.getSearchModel({
        filter: toSearch
      }));
  }


  public searchArt(toSearh: string): void {
    this.searchSubject.next(toSearh);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtCollectionService } from '../../shared/art-collection.service';
import { Observable } from 'rxjs/Observable';
import { ArtWorkDetails, LoadingModel } from '../../models/art-work-details';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.css']
})
export class ArtWorkComponent implements OnInit {

  public artWorkOrLoading$: Observable<ArtWorkDetails | LoadingModel>;

  constructor(
    private route: ActivatedRoute,
    private artService: ArtCollectionService) { }

  ngOnInit() {
    this.artWorkOrLoading$ = this.route.paramMap.switchMap(params => {
      const id = params.get('id');
      return this.artService.getArtWork(id);
    });
  }
}

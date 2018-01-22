import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtCollectionService } from '../../shared/art-collection.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ArtWorkDetails, LoadingModel } from '../../models/art-work-details';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.css']
})
export class ArtWorkComponent implements OnInit {

  public artWork$: Observable<ArtWorkDetails | LoadingModel>;

  constructor(
    private route: ActivatedRoute,
    private artService: ArtCollectionService) { }

  ngOnInit() {
    this.artWork$ = this.route.paramMap.switchMap(params => {
      const id = params.get('id');
      return this.artService.getArtWork(id);
    });
  }
}

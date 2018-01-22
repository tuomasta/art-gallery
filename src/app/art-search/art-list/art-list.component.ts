import { Component, OnInit, Input } from '@angular/core';
import { ArtWork } from '../../models/art-collection';
import { LoadingModel } from '../../models/art-work-details';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {

  @Input() public artCollection: ArtWork[] | LoadingModel;

  constructor() { }

  ngOnInit() {
    this.artCollection = {
      isLoading: true
    };
  }
}

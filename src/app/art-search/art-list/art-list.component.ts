import { Component, OnInit, Input } from '@angular/core';
import { SearchModel } from '../../models/search-model';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {

  @Input() public searchModel: SearchModel;

  constructor() { }

  ngOnInit() {
    this.searchModel = {
      isLoading: true,
      artItems: []
    };
  }
}

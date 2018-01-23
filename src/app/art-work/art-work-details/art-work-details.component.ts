import { Component, OnInit, Input} from '@angular/core';
import { ArtWorkDetails, LoadingModel } from '../../models/art-work-details';

@Component({
  selector: 'app-art-work-details',
  templateUrl: './art-work-details.component.html',
  styleUrls: ['./art-work-details.component.css']
})
export class ArtWorkDetailsComponent implements OnInit {

  @Input() public artWorkOrLoading: ArtWorkDetails | LoadingModel;

  public get isLoading(): boolean {
    return (<any> this.artWorkOrLoading).isLoading;
  }

  public get art(): ArtWorkDetails {
    return this.artWorkOrLoading as ArtWorkDetails;
  }

  constructor() { }

  ngOnInit() {
  }
}

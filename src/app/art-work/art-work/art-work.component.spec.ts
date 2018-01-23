import {ArtCollectionService} from '../../shared/art-collection.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkComponent } from './art-work.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('ArtWorkComponent', () => {
  let component: ArtWorkComponent;
  let fixture: ComponentFixture<ArtWorkComponent>;
  let mockArtCollectionService: ArtCollectionService;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    mockArtCollectionService = {
      getArtWork: id => Observable.of({
        isLoading: true
      })
    } as ArtCollectionService;

    mockActivatedRoute = <ActivatedRoute>{
      paramMap: Observable.of(<ParamMap>{
        get: url => 'id'
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ArtCollectionService, useValue: mockArtCollectionService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute}],
      declarations: [ ArtWorkComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtWorkComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

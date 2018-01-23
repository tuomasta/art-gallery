import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtListComponent } from './art-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ArtCollection } from '../../models/art-collection';

describe('ArtListComponent', () => {
  let component: ArtListComponent;
  let fixture: ComponentFixture<ArtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.artCollection = {
      isLoading: true
    };
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-spinner')).toBeDefined();
  });

  it('should not show spinner when not loading', () => {
    const collection: ArtCollection = {
      totalNumberOfItems: 0,
      artworks: []
    };
    component.artCollection = collection;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-spinner')).toBeFalsy();
  });
});

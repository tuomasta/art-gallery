import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkDetailsComponent } from './art-work-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArtWorkDetailsComponent', () => {
  let component: ArtWorkDetailsComponent;
  let fixture: ComponentFixture<ArtWorkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtWorkDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtWorkDetailsComponent);
    component = fixture.componentInstance;
    component.artWorkOrLoading = {
      isLoading: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

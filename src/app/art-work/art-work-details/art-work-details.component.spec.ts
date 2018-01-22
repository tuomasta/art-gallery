import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkDetailsComponent } from './art-work-details.component';

describe('ArtWorkDetailsComponent', () => {
  let component: ArtWorkDetailsComponent;
  let fixture: ComponentFixture<ArtWorkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtWorkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtWorkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

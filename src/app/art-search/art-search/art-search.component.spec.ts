import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtSearchComponent } from './art-search.component';

describe('ArtSearchComponent', () => {
  let component: ArtSearchComponent;
  let fixture: ComponentFixture<ArtSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

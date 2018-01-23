import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { ArtSearchComponent } from './art-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ArtCollectionService, ISpecifyGetOptions } from '../../shared/art-collection.service';
import { Observable } from 'rxjs/Observable';
import { LoadingModel } from '../../models/art-work-details';
import { ArtCollection } from '../../models/art-collection';

describe('ArtSearchComponent', () => {
  let component: ArtSearchComponent;
  let fixture: ComponentFixture<ArtSearchComponent>;

  beforeEach(async(() => {
    const mockArtCollectionService = {
      getSearchModel: search => null
    } as ArtCollectionService;

    TestBed.configureTestingModule({
      providers: [{ provide: ArtCollectionService, useValue: mockArtCollectionService}],
      declarations: [ ArtSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should contain observable search model after component is initialized', () => {
    component.ngOnInit();
    expect(component.searchModel$).toBeDefined();
  });

  it('should call service to get data after component is initialized and observable is subscribed',
    fakeAsync(inject([ArtCollectionService], (service: ArtCollectionService) => {
    const result = Observable.of({
        isLoading: true
    });
    spyOn(service, 'getSearchModel').and.returnValue(result);
    component.ngOnInit();

    component.searchModel$.subscribe();
    tick(1000);

    const expectParams: ISpecifyGetOptions = {
      filter: '',
      page: 1,
      numberOfItems: 10
    };
    expect(service.getSearchModel).toHaveBeenCalledWith(expectParams);
  })));

  it('should call service again after page is changed',
    fakeAsync(inject([ArtCollectionService], (service: ArtCollectionService) => {
    const result = Observable.of({
        isLoading: true
    });
    spyOn(service, 'getSearchModel').and.returnValue(result);
    component.ngOnInit();

    component.searchModel$.subscribe();
    tick(1000);
    component.onPageChange(5);
    tick();
    const expectParams: ISpecifyGetOptions = {
      filter: '',
      page: 5,
      numberOfItems: 10
    };
    expect(service.getSearchModel).toHaveBeenCalledWith(expectParams);
  })));

  it('should call service again after search is made',
    fakeAsync(inject([ArtCollectionService], (service: ArtCollectionService) => {
    const result = Observable.of({
        isLoading: true
    });
    spyOn(service, 'getSearchModel').and.returnValue(result);
    component.ngOnInit();

    component.searchModel$.subscribe();
    tick(1000);
    component.onSearch('f');
    tick();
    component.onSearch('fo');
    tick();
    component.onSearch('foo');
    tick(1000);

    const expectParams: ISpecifyGetOptions = {
      filter: 'foo',
      page: 1,
      numberOfItems: 10
    };
    expect(service.getSearchModel).toHaveBeenCalledWith(expectParams);
  })));
});

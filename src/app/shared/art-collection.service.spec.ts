import { TestBed, inject } from '@angular/core/testing';

import { ArtCollectionService, ISpecifyGetOptions } from './art-collection.service';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArtWork } from '../models/art-collection';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoadingModel } from '../models/art-work-details';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/skip';


describe('ArtCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtCollectionService]
    });
  });

  it('should be created', inject([ArtCollectionService], (service: ArtCollectionService) => {
    expect(service).toBeTruthy();
  }));

  it('should return loading when getting an art item and not loading when art item is received',
    inject([ArtCollectionService, HttpTestingController],
      (service: ArtCollectionService, httpMock: HttpTestingController) => {

    service.getArtWork('id').first().subscribe((r: LoadingModel) =>  expect(r.isLoading).toBe(true));
    service.getArtWork('id').skip(1).first().subscribe((r: LoadingModel) => expect(r.isLoading).toBeUndefined());

    const res = httpMock.expectOne('https://www.rijksmuseum.nl/api/en/collection/id?key=67CFld9n&format=json');
    expect(res.request.method).toBe('GET');
  }));

  it('should return loading when searching art items and not loading when art item is received',
    inject([ArtCollectionService, HttpTestingController],
      (service: ArtCollectionService, httpMock: HttpTestingController) => {

    const filter: ISpecifyGetOptions = {
      filter: 'f',
      numberOfItems: 5,
      page: 10
    };
    service.getSearchModel(filter).first().subscribe((r: LoadingModel) => expect(r.isLoading).toBe(true));
    service.getSearchModel(filter).skip(1).first().subscribe((r: LoadingModel) => expect(r.isLoading).toBeUndefined());

    // something weird is going on here as url params does not come here
    const res = httpMock.expectOne(req => req.url === 'https://www.rijksmuseum.nl/api/en/collection/');
    expect(res.request.method).toBe('GET');
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ArtCollectionService } from './art-collection.service';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArtWork } from '../models/art-collection';

describe('ArtCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ArtCollectionService]
    });
  });

  it('should be created', inject([ArtCollectionService], (service: ArtCollectionService) => {
    expect(service).toBeTruthy();
  }));
});

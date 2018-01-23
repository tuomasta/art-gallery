import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArtWork, ArtCollection } from '../models/art-collection';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ArtWorkDetails, LoadingModel } from '../models/art-work-details';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

export interface ISpecifyGetOptions {
  page?: number;
  numberOfItems?: number;
  filter?: string;
}

@Injectable()
export class ArtCollectionService {
  private readonly baseurl = 'https://www.rijksmuseum.nl/api/en/collection/';
  constructor(private http: HttpClient) { }

  public getArtWork(id: string): Observable<ArtWorkDetails | LoadingModel> {
    return Observable
      .of({isLoading: true})
      .merge(this.fetchArtWork(id));
  }

  private fetchArtWork(id: string): Observable<ArtWorkDetails> {
    const urlParams: HttpParams = this.createDefaultSearchParamets();
    const url = this.baseurl + id;

    return this.http.get<any>(url, { params: urlParams })
    .retry(3)
    .map(data => {
      return {
        title: data.artObject.title,
        id: data.artObject.objectNumber,
        imageSrc: data && data.artObject && data.artObject.webImage && data.artObject.webImage.url || null,
        principalMaker: data.artObject.principalMaker,
        description: data.artObject.description
      };
    });
  }

  public getSearchModel(options?: ISpecifyGetOptions): Observable<ArtCollection | LoadingModel> {
    return Observable
      .of({isLoading: true })
      .merge(this.fetchArtCollection(options));
  }

  private fetchArtCollection(options?: ISpecifyGetOptions): Observable<ArtCollection> {
    const params = !options ?
      this.createDefaultSearchParamets() :
      this.createSearchParams(options);
    const urlParams = new HttpParams({ fromObject: params});

    console.log('params', urlParams);
    return this.http.get<any>(this.baseurl, { params: urlParams })
    .retry(3)
    .map(data => this.parseData(data));
  }

  private parseData(data: any): ArtCollection {
    return {
      totalNumberOfItems: data.count,
      artworks: data.artObjects.map(o => ({
       title: o.title,
       id: o.objectNumber,
       url: o.links.self,
       creator: o.principalOrFirstMaker
      }))
    };
  }

  private createSearchParams(options: ISpecifyGetOptions): any {
    const params = this.createDefaultSearchParamets();
    if (options.filter) {
      params.S = 'relevance';
      params.Q = options.filter;
    }

    if (options.numberOfItems) params.ps = options.numberOfItems.toString();
    if (options.page) params.p = options.page.toString();
    return params;
  }

  private createDefaultSearchParamets(): any {
    return {
      key: '67CFld9n',
      format: 'json'
    };
  }
}

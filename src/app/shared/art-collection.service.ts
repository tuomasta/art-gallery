import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArtWork } from '../models/art-collection';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ArtWorkDetails, LoadingModel } from '../models/art-work-details';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
export interface ISpecifyGetOptions {
  page?: number;
  numberOfItems?: number;
  filter?: string;
}

@Injectable()
export class ArtCollectionService {
  // private readonly baseurl = 'https://www.rijksmuseum.nl/api/en/collection?key=67CFld9n&format=json&q=bridge&s=relevance&ps=2&p=2';
  // private readonly mock = 'assets/mock-data.json';

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
        imageSrc: data.artObject.webImage.url,
        principalMaker: data.artObject.principalMaker,
        description: data.artObject.description
      };
    });
  }

  public getSearchModel(options?: ISpecifyGetOptions): Observable<ArtWork[] | LoadingModel> {
    return Observable
      .of({isLoading: true })
      .merge(this.fetchArtCollection(options));
  }

  private fetchArtCollection(options?: ISpecifyGetOptions): Observable<ArtWork[]> {
    const urlParams: HttpParams = !options ?
      this.createDefaultSearchParamets() :
      this.createSearchParams(options);

    return this.http.get<any>(this.baseurl, { params: urlParams })
    .retry(3)
    .map(data => this.parseData(data));
  }

  private parseData(data: any): ArtWork[] {
    return data.artObjects.map(o => {
      return {
       title: o.title,
       id: o.objectNumber,
       url: o.links.self
     };
    });
  }

  private createSearchParams(options: ISpecifyGetOptions): any {
    const params = this.createDefaultSearchParamets();
    if (options.filter) {
      params.s = 'relevance';
      params.q = options.filter;
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

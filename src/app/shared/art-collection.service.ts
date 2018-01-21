import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArtItem } from '../models/art-collection';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import { SearchModel } from '../models/search-model';
export interface ISpecifyGetOptions {
  page?: number;
  numberOfItems?: number;
  filter?: string;
}

@Injectable()
export class ArtCollectionService {
  // private readonly baseurl = 'https://www.rijksmuseum.nl/api/en/collection?key=67CFld9n&format=json&q=bridge&s=relevance&ps=2&p=2';
  private readonly baseurl = 'https://www.rijksmuseum.nl/api/en/collection';
  // private readonly mock = 'assets/mock-data.json';
  constructor(private http: HttpClient) { }

  public getArt(
    options?: ISpecifyGetOptions
  ): Observable<ArtItem[]> {
    const urlParams: HttpParams = !options ?
      this.createDefaultSearchParamets() :
      this.createSearchParams(options);

    return this.http.get<any>(this.baseurl, { params: urlParams })
    .map(data => this.parseData(data))
    .retry(3);
  }


  public getSearchModel(options?: ISpecifyGetOptions): Observable<SearchModel>{
    return Observable
      .of({isLoading: true, artItems: [] })
      .merge(
        this.getArt(options).map(items => {
          return {
            isLoading: false,
            artItems: items
          };
      }));
  }

  private parseData(data: any): ArtItem[] {
    return data.artObjects.map(o => {
      return {
       title: o.title,
       id: o.id,
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

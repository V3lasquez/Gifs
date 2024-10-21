import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private apiKey: string = 'YOUR_GIPHY_API_KEY';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {}

  searchGifs(query: string, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', limit);

    return this.http.get<any>(this.apiUrl, { params });
  }
}

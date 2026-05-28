import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  searchVideos(search: string, pageToken = ''): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}?search=${search}&pageToken=${pageToken}`,
    );

  }

}
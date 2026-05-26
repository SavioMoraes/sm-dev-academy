import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/videos';

  searchVideos(search: string, pageToken = ''): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}?search=${search}&pageToken=${pageToken}`,
    );

  }

}
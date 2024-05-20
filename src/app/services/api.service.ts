import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface ApiRequest {
  path: string;
  payload?: unknown
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private endpoint = '/api/';

  constructor(private http: HttpClient) {}

  public get(query: ApiRequest): Observable<unknown> {
    const endpoint = this.buildEndpoint(query);
    return this.http.get(endpoint).pipe(catchError(this.onError));
  }

  public post(request: ApiRequest): Observable<unknown> {
    const endpoint = this.buildEndpoint(request);
    return this.http.post(endpoint, request.payload).pipe(catchError(this.onError));
  }

  public put(request: ApiRequest): Observable<unknown> {
    const endpoint = this.buildEndpoint(request);
    return this.http.put(endpoint, request.payload).pipe(catchError(this.onError));
  }

  public patch(request: ApiRequest): Observable<unknown> {
    const endpoint = this.buildEndpoint(request);
    return this.http.patch(endpoint, request.payload).pipe(catchError(this.onError));
  }

  public delete(request: ApiRequest): Observable<unknown> {
    const endpoint = this.buildEndpoint(request);
    return this.http.delete(endpoint).pipe(catchError(this.onError));
  }

  private buildEndpoint(request: ApiRequest): string {
    return `${this.endpoint}${request.path}`;
  }

  /* TODO : Bad Path Handle and external Http Interceptor for gerneral server errors */
  private onError(error: HttpErrorResponse): Observable<unknown> {
    return throwError(error);
  }
}

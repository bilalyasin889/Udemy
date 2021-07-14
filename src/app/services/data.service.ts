import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, @Inject('url') private url: string) { }

  getAll(){
    return this.http.get(this.url)
        .pipe(map(response => response as any))
        .pipe(catchError(this.handleError));
  }

  create(resource: any){
    return this.http.post<any>(
        this.url, 
        JSON.stringify(resource)
        )
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  update(id: any) {
    return this.http.patch(this.url + '/' + id, JSON.stringify({ isRead: true}))
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(this.url + '/' + id)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {  
    if (error.status === 404)   
          return throwError (new NotFoundError() ); 
    else if (error.status === 400)
          return throwError( new BadInputError(error));
    return throwError ( new AppError(error) );  
  } 
}

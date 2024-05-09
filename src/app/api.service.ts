import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000/api'; // Updated to the second URL

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    console.log('Sending message to backend:', message); // Added console log
    return this.http.post<any>(`${this.baseUrl}/book-recommendations`, { text: message }).pipe(
      catchError(this.handleError)
    );
  }

  getBookRecommendations(inputText: string): Observable<any[]> {
    console.log('Getting book recommendations for:', inputText);
    return this.http.get<any[]>(`${this.baseUrl}/book-recommendations`, { params: { text: inputText } }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Client-side or network error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getLastRecommendation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/last-recommendation`);
  }

}

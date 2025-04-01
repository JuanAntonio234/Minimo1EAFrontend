import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/ratingModel';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:3000/api/ratingScore';  // Cambia esto según la URL de tu API

  constructor(private http: HttpClient) {}

   // Crear una nueva valoración
   createRating(ratingData: any): Observable<any> {
    return this.http.post(this.apiUrl, ratingData);
  }

   // Actualizar valoración
   updateRating(ratingId:string,ratingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ratingId}`, ratingData);
  }

  // Obtener puntuaciones de un usuario paginadas
  getRatings(userRated: string, page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()
       .set('page', page.toString())
       .set('limit', limit.toString());

     return this.http.get<any>(this.apiUrl, { params });
   }

  // Obtener la puntuación promedio 
  getUserAverageRating(userId: string): Observable<any> {



    ///creo que la url esta mal



    
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Eliminar puntuación
  deleteRating(ratingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ratingId}`);
  }
}
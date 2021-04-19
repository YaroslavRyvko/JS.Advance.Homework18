import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/categories';
  }

  getCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }
  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, category)
  }
  deleteCategory(id: string | number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${id}`);
  }
  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${category.id}`, category);
  }

}

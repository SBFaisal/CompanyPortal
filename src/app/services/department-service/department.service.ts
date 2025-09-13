import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeparment } from '../../model/responseModels/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }
  
  baseUrl: string = "https://localhost:7238/api/Department/"
  GetAllDepartment(): Observable<IDeparment[]>{
    return this.http.get<IDeparment[]>(this.baseUrl+"GetAllDepartments");
  }

  GetChildDepartmentsByParentId(id: number): Observable<IDeparment[]>{
    return this.http.get<IDeparment[]>(`${this.baseUrl}GetChildDepartmentsByParentId/${id}`);
  }

  // Add Department
  
}

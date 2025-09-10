import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IDeparment } from '../../model/interface/DepartmentInterface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }
  
  baseUrl: string = "https://localhost:7238/api/Department/"
  getAllParentDepartment(): Observable<IDeparment[]>{
    return this.http.get<IDeparment[]>(this.baseUrl+"GetAllParentDepartments");
  }

  getChildDepartmentsByParentId(id: number): Observable<IDeparment[]>{
    return this.http.get<IDeparment[]>(`${this.baseUrl}GetChildDepartmentsByParentId/${id}`);
  }
}

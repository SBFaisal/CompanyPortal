import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../model/interface/DepartmentInterface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }
  
  baseUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/"
  getAllParentDepartment(): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(this.baseUrl+"GetParentDepartment");
  }

  getChildDepartmentsByParentId(id: number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.baseUrl}getChildDepartmentsByParentId?deptId=${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../model/requestModels/Department';
import { IDepartment } from '../../model/responseModels/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  baseUrl: string = "https://localhost:7238/api/Department/"

  GetAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.baseUrl + "GetAllDepartments");
  }

  // Get Department by ID
  GetDepartmentById(departmentId: string): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${this.baseUrl}GetDepartment?id=${departmentId}`);
  }

  // Add Department
  CreateDepartment(department: Department): Observable<boolean> {
    const fullUrl = `${this.baseUrl}AddDepartment`
    return this.http.post<boolean>(fullUrl, department);
  }

  // Update Department
  UpdateDepartment(department: Department, departmentId: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}UpdateDepartment?id=${departmentId}`, department);
  }

  // Delete Department
  DeleteDepartment(departmentId: string) {
    return this.http.delete<boolean>(`${this.baseUrl}DeleteDepartment/${departmentId}`);
  }

}

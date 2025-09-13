import { Injectable } from '@angular/core';
import { IProject } from '../../model/responseModels/IProject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../model/requestModels/ProjectClass';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

   baseUrl: string = "https://localhost:7238/api/Project/"
  
      // Get All Employees
      GetAllProjects(){
        return this.http.get<IProject[]>(`${this.baseUrl}GetAllProjects`)
      }
  
      // Get Employee by ID
      GetEmployeeById(employeeId: string): Observable<IProject>{
        return this.http.get<IProject>(`${this.baseUrl}GetProject?id=${employeeId}`);
      }
  
      // Add Employee
      CreateProject(project: Project): Observable<boolean>{
        const fullUrl = `${this.baseUrl}AddProject`
        debugger
        return this.http.post<boolean>(fullUrl, project);
      }
      
      // Update Employee
      DeleteProject(projectId: string): Observable<boolean>{
        return this.http.delete<boolean>(`${this.baseUrl}DeleteProject/${projectId}`);
      }

      UpdateProject(project: Project, projectId: string): Observable<boolean>{
        return this.http.post<boolean>(`${this.baseUrl}UpdateProject?id=${projectId}`, project);
      }

}

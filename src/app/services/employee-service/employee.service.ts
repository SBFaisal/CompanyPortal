import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../model/class/EmployeeClass';
import { IApiResponse } from '../../model/interface/DepartmentInterface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
    
    baseUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/"
    CreateEmployee(employee: Employee): Observable<IApiResponse>{
      employee.createdDate = new Date().toDateString();
      return this.http.post<IApiResponse>(`${this.baseUrl}CreateEmployee`, employee);
    }
    private employees: Employee[] = [
      {
        employeeId: 4542,
        employeeName: 'mihika',
        contactNo: '981391999',
        emailId: 'mihika@gmail.com',
        deptId: 3332,
        password: '123456789',
        gender: 'female',
        role: 'Employee',
        createdDate: '2025-02-26T00:00:00'
      },
      {
        "employeeId": 4544,
        "employeeName": "Mahira",
        "contactNo": "1122332121",
        "emailId": "mahira@gmail.com",
        "deptId": 3334,
        "password": "112233",
        "gender": "female",
        "role": "Employee",
        "createdDate": "2024-12-25T00:00:00"
      }
    ];
    GetAllEmployees(){
      return of(this.employees);
      // return this.http.get<Employee[]>(`${this.baseUrl}`)
    }

    DeleteEmployee(id: number){
      // Delete Employee
    }
}

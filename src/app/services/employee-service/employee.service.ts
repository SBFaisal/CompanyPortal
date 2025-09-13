import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../model/requestModels/EmployeeClass';
import { Observable, of } from 'rxjs';
import { IEmployee } from '../../model/responseModels/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
    
    baseUrl: string = "https://localhost:7238/api/Employee/"

    // Get All Employees
    GetAllEmployees(){
      return this.http.get<IEmployee[]>(`${this.baseUrl}GetAllEmployees`)
    }

    // Get Employee by ID
    GetEmployeeById(employeeId: string): Observable<IEmployee>{
      return this.http.get<IEmployee>(`${this.baseUrl}GetEmployee?id=${employeeId}`);
    }

    // Add Employee
    CreateEmployee(employee: Employee): Observable<boolean>{
      const fullUrl = `${this.baseUrl}AddEmployee`
      return this.http.post<boolean>(fullUrl, employee);
    }
    
    // Update Employee
    UpdateEmployee(employee: Employee, employeeId: string): Observable<boolean>{
      return this.http.post<boolean>(`${this.baseUrl}UpdateEmployee?id=${employeeId}`, employee);
    }

    // Delete Employee
    DeleteEmployee(employeeId: string){
      return this.http.delete<boolean>(`${this.baseUrl}DeleteEmployee/${employeeId}`);
    }

    // private employees: Employee[] = [
    //   {
    //     employeeId: "4542",
    //     employeeName: 'mihika',
    //     contactNo: '981391999',
    //     emailId: 'mihika@gmail.com',
    //     departmentId: "3332",
    //     departmentName: "IT",
    //     projectId: "2222",
    //     password: '123456789',
    //     gender: 'female',
    //     role: 'Employee',
    //     createdDate: '2025-02-26T00:00:00'
    //   },
    //   {
    //     "employeeId": "4544",
    //     "employeeName": "Mahira",
    //     "contactNo": "1122332121",
    //     "emailId": "mahira@gmail.com",
    //     "departmentId": "3334",
    //     "departmentName": "HR",
    //     "projectId": "2223",
    //     "password": "112233",
    //     "gender": "female",
    //     "role": "Employee",
    //     "createdDate": "2024-12-25T00:00:00"
    //   }
    // ];
}

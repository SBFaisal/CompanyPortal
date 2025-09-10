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
    
    baseUrl: string = "https://localhost:7238/api/Employee/"
    CreateEmployee(employee: Employee): Observable<boolean>{
      employee.createdDate = new Date().toISOString();
      employee.projectId = "3fa85f64-5717-4562-abcd-2c963f667777"
      debugger;
      const fullUrl = `${this.baseUrl}AddEmployee`
      return this.http.post<boolean>(fullUrl, employee);
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
    GetAllEmployees(){
      //return of(this.employees);
      return this.http.get<Employee[]>(`${this.baseUrl}GetAllEmployees`)
    }

    DeleteEmployee(id: number){
      // Delete Employee
    }
}

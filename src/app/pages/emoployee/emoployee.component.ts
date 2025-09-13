import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service/department.service';
import { IDeparment } from '../../model/responseModels/IDepartment';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/requestModels/EmployeeClass';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Designation } from '../constants/Designations';
import { IEmployee } from '../../model/responseModels/IEmployee';

@Component({
  selector: 'app-emoployee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './emoployee.component.html',
  styleUrl: './emoployee.component.css'
})
export class EmoployeeComponent implements OnInit{
  
  departmentService = inject(DepartmentService);
  employeeService = inject(EmployeeService);

  isFormVisible = signal<boolean>(false);
  departmentList = signal<IDeparment[]>([]);
  designations = signal<string[]>([]);
  employeeList = signal<IEmployee[]>([]);

  isEditMode = false;

  employeeObj: Employee = new Employee()
  employeeIdToDelete: string = ''

  ngOnInit(): void {
    this.designations.set(Designation.roles)
    this.getAllDepartments();
    this.getAllEmployees();
  }

  getAllDepartments(){
    this.departmentService.GetAllDepartment().subscribe((res:IDeparment[]) =>{
      this.departmentList.set(res)
    })
  }

  onSave(){
    this.employeeService.CreateEmployee(this.employeeObj).subscribe((res: boolean) =>{
      this.isFormVisible.set(false)
      alert("Empoyee Created")
      this.getAllEmployees()
      this.employeeObj = new Employee()
    }, error => {
      alert("Error while creating employee")
    })
  }

  getAllEmployees(){
    this.employeeService.GetAllEmployees().subscribe((res: IEmployee[]) =>{
      this.employeeList.set(res)
    })
  }

  onEdit(employee: IEmployee){
    debugger;
    this.isFormVisible.set(true)
    this.isEditMode = true
    this.employeeIdToDelete = employee.employeeId
    this.employeeObj = {
      employeeName: employee.employeeName,
      contactNo: employee.contactNo,
      emailId: employee.emailId,
      password: '123456789',
      gender: employee.gender,
      role: employee.role,
      departmentId: this.departmentList().find(x => x.departmentName === employee.departmentName)?.id.toString() || ''
    }
  }

  onUpdate(){
    debugger
        this.employeeService.UpdateEmployee(this.employeeObj, this.employeeIdToDelete).subscribe((res: boolean) =>{
          this.isFormVisible.set(false)
          alert("Employee Updated")
          this.getAllEmployees()
          this.employeeObj = new Employee()
        }, error => {
          alert("Error while updating employee")
        })
      }

  onDelete(employeeId: string){
    this.employeeService.DeleteEmployee(employeeId).subscribe((res: boolean) =>{
      alert("Employee Deleted")
      this.getAllEmployees()
    }, error => {
      alert("Error while deleting employee")
    })
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service/department.service';
import { IApiResponse, IDeparment } from '../../model/interface/DepartmentInterface';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/EmployeeClass';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Designation } from '../constants/Designations';

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
  parentDepartmentList = signal<IDeparment[]>([]);
  childDepartmentList = signal<IDeparment[]>([]);
  designations = signal<string[]>([]);
  employeeList = signal<Employee[]>([]);

  parentDepartmentId: number = 0

  employeeObj: Employee = new Employee();
  ngOnInit(): void {
    this.designations.set(Designation.roles)
    this.getParentAllDepartments();
    this.getAllEmployees();
  }

  getParentAllDepartments(){
    this.departmentService.getAllParentDepartment().subscribe((res:IDeparment[]) =>{
      this.parentDepartmentList.set(res)
    })
  }

  onParentDepartmentChange(){
    this.departmentService.getChildDepartmentsByParentId(this.parentDepartmentId).subscribe((res: IDeparment[]) =>{
      this.childDepartmentList.set(res)
    })
  }

  onSave(){
    this.employeeService.CreateEmployee(this.employeeObj).subscribe((res: boolean) =>{
      alert("Empoyee Created")
      this.getAllEmployees()
      this.employeeObj = new Employee()
    }, error => {

    })
  }

  getAllEmployees(){
    this.employeeService.GetAllEmployees().subscribe((res: Employee[]) =>{
      this.employeeList.set(res)
      debugger;
    })
  }

  onEdit(){

  }

  onDelete(){

  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service/department.service';
import { IApiResponse, IChildDeparment, IParentDeparment } from '../../model/interface/DepartmentInterface';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/EmployeeClass';
import { EmployeeService } from '../../services/employee-service/employee.service';

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
  parentDepartmentList = signal<IParentDeparment[]>([]);
  childDepartmentList = signal<IChildDeparment[]>([]);
  employeeList = signal<Employee[]>([]);

  parentDepartmentId: number = 0

  employeeObj: Employee = new Employee();
  ngOnInit(): void {
    this.getParentAllDepartments();
    this.getAllEmployees();
  }

  getParentAllDepartments(){
    this.departmentService.getAllParentDepartment().subscribe((res:IApiResponse) =>{
      this.parentDepartmentList.set(res.data)
    })
  }

  onParentDepartmentChange(){
    this.departmentService.getChildDepartmentsByParentId(this.parentDepartmentId).subscribe((res: IApiResponse) =>{
      this.childDepartmentList.set(res.data)
    })
  }

  onSave(){
    this.employeeService.CreateEmployee(this.employeeObj).subscribe((res: IApiResponse) =>{
      alert("Empoyee Created")
      this.getAllEmployees()
      this.employeeObj = new Employee()
    }, error => {

    })
  }

  getAllEmployees(){
    this.employeeService.GetAllEmployees().subscribe((res: Employee[]) =>{
      this.employeeList.set(res)
    })
  }

  onEdit(){

  }

  onDelete(){

  }
}

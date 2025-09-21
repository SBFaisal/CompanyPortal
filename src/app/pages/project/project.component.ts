import { Component, inject, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service/department.service';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { IEmployee } from '../../model/responseModels/IEmployee';
import { Project } from '../../model/requestModels/ProjectClass';
import { IProject } from '../../model/responseModels/IProject';
import { ProjectService } from '../../services/projetc-service/project.service';
import { FormsModule } from '@angular/forms';
import { IDepartment } from '../../model/responseModels/IDepartment';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

    // Services
    departmentService = inject(DepartmentService);
    employeeService = inject(EmployeeService);
    projectService = inject(ProjectService);

    // Lists
    departmentList = signal<IDepartment[]>([]);
    employeeList = signal<IEmployee[]>([]);
    projectList = signal<IProject[]>([]);

    // Properties
    projectObj: Project = new Project()
    projectIdToDelete: string = ''
    isFormVisible = signal<boolean>(false);
    isEditMode = false;
  
    ngOnInit(): void {
      this.getAllDepartments();
      this.getAllEmployees();
      this.getAllProjects();
    }
  
    getAllDepartments(){
      this.departmentService.GetAllDepartments().subscribe((res:IDepartment[]) =>{
        this.departmentList.set(res)
      })
    }
    
    getAllEmployees(){
      this.employeeService.GetAllEmployees().subscribe((res: IEmployee[]) =>{
        this.employeeList.set(res)
      })
    }

    getAllProjects(){
      this.projectService.GetAllProjects().subscribe((res: IProject[]) =>{
        this.projectList.set(res)
      })
    }

    onSave(){
      this.projectService.CreateProject(this.projectObj).subscribe((res: boolean) =>{
        this.isFormVisible.set(false)
        alert("Project Created")
        this.getAllProjects()
        this.projectObj = new Project()
      }, error => {
        alert("Error while creating project")
      })
    }
  
    onEdit(project: IProject){
      this.isFormVisible.set(true)
      this.isEditMode = true
      this.projectIdToDelete = project.id.toString()
      this.projectObj = {
        ProjectName: project.projectName,
        ClientName: project.clientName,
        LeadByEmployeeId: this.employeeList().find( e => e.employeeName === project.leadByEmployee)?.employeeId.toString() || '',
        DepartmentId: this.departmentList().find(d => d.departmentName === project.department)?.id.toString() || ''
      }
    }

    onUpdate(){
      this.projectService.UpdateProject(this.projectObj, this.projectIdToDelete).subscribe((res: boolean) =>{
        this.isFormVisible.set(false)
        alert("Project Updated")
        this.getAllProjects()
        this.projectObj = new Project()
      }, error => {
        alert("Error while updating project")
      })
    }
  
    onDelete(projectId: string){
      this.projectService.DeleteProject(projectId).subscribe((res: boolean) =>{
        alert("Project Deleted")
        this.getAllProjects()
      }, error => {
        alert("Error while deleting project")
      })
    }
}

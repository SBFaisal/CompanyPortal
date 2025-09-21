import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { DepartmentService } from '../../services/department-service/department.service';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDepartment } from '../../model/responseModels/IDepartment';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      DepartmentName: ['', [Validators.required, Validators.minLength(3)]],
      Logo: ['']
    })
  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  departmentList: IDepartment[] = []
  departmentForm: FormGroup = {} as FormGroup;
  isFormVisible = signal<boolean>(false);
  isEditMode = false;
  departmentIdToDelete: string = ''


  getAllDepartments() {
    this.departmentService.GetAllDepartments().subscribe((res: IDepartment[]) => {
      this.departmentList = res
    })
  }

  onSubmit() {
    this.departmentService.CreateDepartment(this.departmentForm.value).subscribe((res: boolean) => {
      if (res) {
        alert("Department added successfully");
        this.getAllDepartments();
        this.isFormVisible.set(false);
        this.departmentForm.reset();
      } else {
        alert("Failed to add department");
      }
    });
  }

  onEdit(item: IDepartment) {
    this.isFormVisible.set(true);
    this.isEditMode = true;
    this.departmentIdToDelete = item.id.toString()
    this.departmentForm.patchValue({
      DepartmentName: item.departmentName,
      Logo: item.logo
    });
  }

  onUpdate() {
    this.departmentService.UpdateDepartment(this.departmentForm.value, this.departmentIdToDelete).subscribe((res: boolean) => {
      this.isFormVisible.set(false)
      alert("Project Updated")
      this.getAllDepartments()
      this.departmentForm.reset();
      this.isEditMode = false
    }, error => {
      alert("Error while updating project")
    })
  }

  onDelete(id: string) {
    this.departmentService.DeleteDepartment(id).subscribe((res: boolean) => {
      if (res) {
        alert("Department deleted successfully");
        this.getAllDepartments();
      } else {
        alert("Failed to delete department");
      }
    })
  }
}

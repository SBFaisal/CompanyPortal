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
    this.userForm = this.fb.group({
      DepartmentName: ['', Validators.required, Validators.minLength(5)],
      Logo: ['']
    })
  }

  departmentList: IDepartment[] = []
  userForm: FormGroup = {} as FormGroup;
  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.GetAllDepartments().subscribe((res: IDepartment[]) => {
      this.departmentList = res
    })
  }

  onSubmit() {

    console.log(this.userForm.value);

  }
}

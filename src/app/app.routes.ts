import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { EmoployeeComponent } from './pages/emoployee/emoployee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmployeeComponent } from './pages/project-employee/project-employee.component';
import { DepartmentComponent } from './pages/department/department.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DasboardComponent
            }, 
            {
                path:'employee',
                component:EmoployeeComponent
            }, 
            {
                path:'project',
                component:ProjectComponent
            },
            {
                path:'department',
                component:DepartmentComponent
            }, 
            {
                path:'project-employee',
                component:ProjectEmployeeComponent
            }
        ]
    }
];

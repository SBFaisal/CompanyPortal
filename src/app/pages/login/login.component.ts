import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);

  loginObj: any = {
    username:'',
    password:''
  }

  onLogin(){
    if(this.loginObj.username == "user" && this.loginObj.password == "123"){
      this.router.navigateByUrl('dashboard')
    } else{
      alert("wrong credentials.")
    }
  }
}

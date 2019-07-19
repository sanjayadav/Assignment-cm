import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{ RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'',redirectTo:'login',pathMatch:'full'}
    ])
  ],
  declarations: [SignupComponent, LoginComponent]
})
export class UserModule { }

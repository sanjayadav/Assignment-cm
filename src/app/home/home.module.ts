import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRouteGuardService } from './home-route-guard.service';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'home',component:MainPageComponent,canActivate: [HomeRouteGuardService] }
    ])
  ],
  providers:[HomeRouteGuardService]
})
export class HomeModule { }

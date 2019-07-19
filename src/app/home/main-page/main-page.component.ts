import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public allTodo;

  constructor(private appService:AppService, private _route:ActivatedRoute, private router: Router,private toastr: ToastrService, private cookieService : CookieService) {}

   public todoTitle: string;

  ngOnInit() {
    this.allTodo = this.appService.allTodoFunction().subscribe(
      data =>{
        console.log(data);
        this.allTodo=data.data;
      },
      error=>{
        console.log("Some error occured");
        console.log(error);
      }
    );
  }

  public createTodo():any{
    
     let title= this.todoTitle
    this.appService.createTodo(title).subscribe(

      data=>{
        console.log("todo created");
        console.log(data);
        this.toastr.success('Task added succesfully!','Success');
        
      },
      error=>{
        console.log("some error occured");
        console.log(error);
        alert("Some error occured!");
      }
    )

  }
  public deleteThisTodo(currentTodo):any{
    this.appService.deleteTodo(currentTodo).subscribe(
      data=>{
        console.log(data);
        this.toastr.success('Task Deleted Succesfully!','Success');
      },

      error=>{
        console.log("Some error occured.");
        console.log(error);
        this.toastr.error('Some Error Occured!','Error');
      }
    )
  }

  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookieService.delete('authtoken');

          this.cookieService.delete('receiverId');

          this.cookieService.delete('receiverName');
          
          this.cookieService.delete('session');

          this.cookieService.delete('session.sig');

          this.router.navigate(['/login']);

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('Some error occured')

      });

  } // end logout
}

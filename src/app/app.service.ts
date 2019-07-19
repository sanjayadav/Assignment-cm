import { Injectable } from '@angular/core';
//import observable related code
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


//importing http client to make the request
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{HttpErrorResponse,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url='http://localhost:3000/api/v1';

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  public signupFunction(data):Observable<any>{
    const params = new HttpParams()
    .set('firstName' , data.firstName)
    .set('lastName' , data.lastName)
    .set('email' , data.email)
    .set('password' , data.password)
    .set('apiKey' , data.apiKey);
    return this.http.post(`${this.url}/users/signup`,params);
  }//end of signupFunction

  public signinFunction(data):Observable<any>{
    const params = new HttpParams()
    .set ('email', data.email)
    .set('password',data.password);
    return this.http.post(`${this.url}/users/login`,params);
  }
  
  public getUserInfoFromLocalstorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }
  public setUserInfoInLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }
  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken',this.cookieService.get('authtoken'))
    return this.http.post(`${this.url}/users/logout`, params);
  } // end logout function

  //******************************Dashboard Routes***************************/
  
  public allTodoFunction(): Observable<any>{
    const params= new HttpParams() 
    .set('authToken', this.cookieService.get('authtoken'))
    return this.http.get(`${this.url}/dashboard`, {params:params});
  }
  
  //function to create task
  public createTodo(title): Observable<any>{
    const params = new HttpParams()
    .set('authToken',this.cookieService.get('authtoken'))
    .set('title' , title) 
    return this.http.post(`${this.url}/dashboard/create`,params);  
  }

  //function to delete task
   public deleteTodo(taskId): Observable<any>{
    const params = new HttpParams()
    .set('authToken',this.cookieService.get('authtoken'))
    .set('taskId' , taskId)
    .set('data', null)
    return this.http.post(`${this.url}/dashboard/`+taskId+'/delete',params);
  }
  
  //exception handler
  private handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }
}

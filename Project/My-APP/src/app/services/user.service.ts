import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
  commonUrl = 'http://localhost:3000'
  public token =null
  
  public imgURL = "http://localhost:3000/"
  lang: string ='en'
    islogged: any;
  
    constructor(private _http:HttpClient) {
     
      this.lang = localStorage.getItem('currentLanguage') || "1"
     }
  

  signUp(obj:any):Observable<any>{
      return this._http.post(`${this.commonUrl}/Registeruser`,obj)
     }
  loginUser(obj:any):Observable<any>{
    return this._http.post(`${this.commonUrl}/loginuser`,obj)
   }
  logOutUser():Observable<any>{
    return this._http.get(`${this.commonUrl}/user/logout`)
  }
  logOutAllUser():Observable<any>{
    return this._http.get(`${this.commonUrl}/user/logoutAll`)
  }
  authMe():Observable<any>{
    return this._http.post(`${this.commonUrl}/users/me`,null)
   }
   profile():Observable<any>{
    return this._http.get(`${this.commonUrl}/adminProfile`)
   }

  showAllUsers():Observable<any>{
    return this._http.get(`${this.commonUrl}/allWriters`)
   }
 
   showSingleUser(id:any):Observable<any>{
      return this._http.get(`${this.commonUrl}/singleWriter/${id}`)
   }
}


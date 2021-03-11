import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _user:UserService) { }

  userData={
    name:"",
    email:""
  }
  ngOnInit(): void {
    this._user.profile().subscribe(data=>{
      this.userData.email=data.data.email
      this.userData.name=data.data.name
    })
  }
}
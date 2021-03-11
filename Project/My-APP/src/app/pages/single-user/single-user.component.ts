import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  userData :any
  constructor(private _user:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._user.showSingleUser(this.route.snapshot.paramMap.get('id')).subscribe(single=>{
      this.userData = single.data})
  }
}
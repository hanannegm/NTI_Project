import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  allData:any="localhost:3000/allBooks";
  //  filtered = this.allData
   val = ""
  
   filterbooks(val:any){
     let key = val.target.value
 
     this.allData.filter((el:any)=>{
 
       return el.title.includes(key)
 
     })
   }
constructor() { }

ngOnInit(): void {
}

}

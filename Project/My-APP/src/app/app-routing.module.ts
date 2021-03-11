import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { SingleUserComponent } from './pages/single-user/single-user.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"allBooks",component:BooksComponent},
  {path:"allWriters",component:UserComponent},
  {path:"singleBook/:id",component:SingleBookComponent},
  {path:"singleUser/:id",component:SingleUserComponent},
  {path:'**',component:Error404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

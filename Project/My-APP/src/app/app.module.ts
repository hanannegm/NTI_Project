import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UserComponent } from './pages/user/user.component';
import { SingleUserComponent } from './pages/single-user/single-user.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { Error404Component } from './pages/error404/error404.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserService } from './services/user.service';
import { UserInterceptor } from './user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    CommentsComponent,
    UserComponent,
    SingleUserComponent,
    SingleBookComponent,
    Error404Component,
    FooterComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,{
      provide:HTTP_INTERCEPTORS,
      useClass:UserInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

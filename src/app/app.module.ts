import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HttpService } from './http.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { UploadsongComponent } from './uploadsong/uploadsong.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'list',component:ListComponent},
  {path:'uploadSong/:sid',component:UploadsongComponent}
];
@NgModule({
  declarations: [
    AppComponent,LoginComponent,HomeComponent,ListComponent,UploadsongComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

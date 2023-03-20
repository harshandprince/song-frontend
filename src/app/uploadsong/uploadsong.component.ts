import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-uploadsong',
  templateUrl: './uploadsong.component.html',
  styleUrls: ['./uploadsong.component.css']
})
export class UploadsongComponent implements OnInit {
  public file:any;
  public sid:any;
  onChange(event:any) {
    this.file = event.target.files[0];
  }
  constructor(public activatedroute:ActivatedRoute,public router:Router,public toastr:ToastrService,public http:HttpService) {
    this.sid=activatedroute.snapshot.paramMap.get('sid');
   }


  ngOnInit(): void {
  }
  save(){
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);
    formData.append('name',this.file.name);
    formData.append('sid',this.sid);
    this.http.uploadSong(formData).subscribe(
      (data:any)=>{
        if(data['status']==200){
          this.router.navigate(['/home']);

          this.toastr.success('song added','success');
        }
        else{
          this.toastr.error('not found','error getting listings');
        }
      },
    (err)=>{
      console.log('error');
    console.log(err.message);
    // this.router.navigate(['/error']);
    });
}
}

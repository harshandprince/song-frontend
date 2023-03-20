import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
public name:any;
public desc:any;
public file:any;
  constructor(public router:Router,public toastr:ToastrService,public http:HttpService) { }

  ngOnInit(): void {
  }
  onChange(event:any) {
    this.file = event.target.files[0];
  }
  save(){
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
      formData.append('name',this.name);
      formData.append('desc',this.desc);
      this.http.listSong(formData).subscribe(
        (data:any)=>{
          if(data['status']==200){
            console.log(data);
            this.toastr.success('listings done','success');
            this.router.navigate(['/uploadSong',data.data.sid]);
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

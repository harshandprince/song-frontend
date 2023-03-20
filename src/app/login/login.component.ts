import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string="";//to get email from user
  public password: string="";//to get password from user
  constructor(private toastr: ToastrService, private router: Router, private httpservice: HttpService) { }

  ngOnInit() {
    let token = this.httpservice.getlocalstorageauthToken();
    if (token == null || token == undefined || token == '') {
       this.httpservice.setdetailsfromstorage();
    }
    else {
      console.log('not empty');
      this.httpservice.setdetailsfromstorage();
      this.router.navigate(['/home']);
    }
  }

  login() {
    let o = {
      "email": this.email.toLowerCase(),
      "password": this.password
    }
    this.httpservice.login(o).subscribe(
      (data: any) => {
        console.log('data recieved');
        if (data['status'] == 500) {
          this.toastr.error('error', data['message']);
        }
        else if (data['status'] == 404) {
          this.toastr.info('register first', data['message']);
        }
        else if (data['status'] == 200) {
          this.toastr.success("login success");
          let userdata = data['data'];
          this.httpservice.setbasicdetails(userdata.uid);

          this.httpservice.setlocalstorageauthToken(userdata);

          this.router.navigate(['/home']);
        }

      },
      (err:any) => {
        console.log('error');
        console.log(err.message);

        //this.router.navigate(['/error']);
      }
    );
  }//login ends

}



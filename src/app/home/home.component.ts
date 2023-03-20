import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public allsongs: any = [];
  public length: number = 0;
  public src: any;
  public audio:any;

  constructor(private toastr: ToastrService, private router: Router, public http: HttpService) { }

  ngOnInit(): void {
    if (this.http.uid == null || this.http.uid == undefined) {
      // this.http.logout();
      // this.router.navigate(['/login']);
    }
    this.getAllListings();
  }
  getAllListings() {
    this.http.getAllListings({ pageNumber: 1, size: 20 }).subscribe(
      (data: any) => {
        if (data['status'] == 200) {
          let da = data['data'];
          console.log(da);
          this.length = da.TotalSongs;
          this.allsongs = da.listings;
          this.toastr.success('listings found', 'success');
        }
        else {
          this.toastr.error('not found', 'error getting listings');
        }
      },
      (err) => {
        console.log('error');
        console.log(err.message);
        // this.router.navigate(['/error']);
      });
  }
  deleteListing(sid: any) {
    this.http.deletesong({ sid: sid }).subscribe(
      (data: any) => {
        if (data['status'] == 200) {
          this.getAllListings();
          this.toastr.success('listings deleted', 'success');
        }
        else {
          this.toastr.error('not found', 'error deleting listings');
        }
      },
      (err) => {
        console.log('error');
        console.log(err.message);
        // this.router.navigate(['/error']);
      });
  }
  playSong(songName: any) {
    this.http.getSong({songName:songName}).subscribe(
      (data)=>{
        const file = new File([data], "voice.mp3")
        let blobfile=URL.createObjectURL(file);
        this.audio = new Audio();
        this.audio.src =blobfile;
        this.audio.load();
        this.audio.play();
      }
    );
  }
  pauseplay(){
    this.audio.pause();
  }
}

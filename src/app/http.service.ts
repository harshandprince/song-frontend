import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public url = "http://localhost:4500/";
  public uid: any;

  constructor(private http: HttpClient) { }

  listSong(data: any) {
    return this.http.post(this.url + 'listSong', data);
  }
  uploadSong(data: any) {
    return this.http.post(this.url + 'uploadSong', data);
  }
  getSong(data: any) {
    return this.http.post(this.url + 'getSong', data,{ responseType: 'blob' });
  }
  editSongListing(data: any) {
    return this.http.post(this.url + 'editSongListing', data);
  }
  deletesong(data: any) {
    return this.http.post(this.url + 'deleteSong', data);
  }
  getAllListings(data:any) {
    return this.http.post(this.url + 'getAllListings',data);
  }

  login(data: { email: string; password: string; }) {
    return this.http.post(this.url + 'login', data);
  }

  setbasicdetails(uid: any) {
    this.uid = uid;
  }
  setdetailsfromstorage() {
    let data = JSON.parse(localStorage.getItem('authToken') || '{}');
    console.log(data);
    this.uid = data.uid;
  }
  logout() {
    this.deletelocalstorageauthToken();
  }
  setlocalstorageauthToken(
    data: any //runs when users logged in
  ) {
    this.uid=data.uid;
    console.log('set called');
    localStorage.setItem('authToken', JSON.stringify(data));
  }
  deletelocalstorageauthToken() {
    //runs when user logged out
    localStorage.removeItem('authToken');
  }
  getlocalstorageauthToken() {
    return localStorage.getItem('authToken');
  }
}

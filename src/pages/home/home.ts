import { Component, Injectable, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import { AboutPage } from '../about/about';
import { AddEventPage } from '../add-event/add-event';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  

  chars:Observable<any>;
  lista:Observable<any>;
  character: Observable<any>;

  private chavePublica:string = "875b4f23c8df4dfd7835e73632ae9403";
  private chavePrivada:string = "4121063d76d77c633ad352cd204b77ed01e91942";
  private url:string = "https://gateway.marvel.com:443/v1/public/comics?orderBy=modified&apikey=";
  private timestamp = Number(new Date());


  
  
  hash = Md5.hashStr(this.timestamp+this.chavePrivada+this.chavePublica);

  teste:string = (this.url+this.chavePublica+'&ts='+this.timestamp+'&hash='+this.hash);

  constructor(public navCtrl: NavController, public HttpClient: HttpClient) {
    console.log(this.teste);
    this.chars = this.HttpClient.get(this.url+this.chavePublica+'&ts='+this.timestamp+'&hash='+this.hash);
    
    this.chars
    .subscribe(data => {
     
     this.lista = data.data;
     

     console.log(this.lista);
    })

    
  }
  openDetails(list) {
     this.navCtrl.push(AboutPage, {lista: list});
  }
  addEvent() {
    this.navCtrl.push(AddEventPage);
  }
  
}

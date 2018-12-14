import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  gHeros: any;
  url_char:string;

  private chavePublica:string = "875b4f23c8df4dfd7835e73632ae9403";
  private chavePrivada:string = "4121063d76d77c633ad352cd204b77ed01e91942";
  private url:string =  "?orderBy=modified&apikey=";
  private timestamp = Number(new Date());
  comics: Observable<any>;
  lista: Observable<any>;
  private hash;
  private descricao:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpClient: HttpClient) {
     this.gHeros = this.navParams.get('lista');
     let chave = Object.keys(this.gHeros.events.items);
     this.url_char = this.gHeros.characters.collectionURI;
     this.hash = Md5.hashStr(this.timestamp+this.chavePrivada+this.chavePublica);
     this.descricao = this.gHeros.description;
     this.comics = this.HttpClient.get(this.url_char+this.url+this.chavePublica+'&ts='+this.timestamp+'&hash='+this.hash);

     this.comics.subscribe(data =>{
      this.lista = data.data;
      console.log(this.gHeros);
      console.log(this.lista);
     })
     
     
  }

  

  
  
  
  
  


  

}

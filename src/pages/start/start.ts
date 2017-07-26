import { MetroService } from './../../services/metroService';
import { Component,Output } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import {AutocompletePage} from './../start/autocomplete';

import { HomePage } from '../home/home';
/**
 * Generated class for the StartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  address:any;
  start:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private modalCtrl:ModalController,public metro:MetroService) {
   // metro.getResults("subway");
   this.address = {
      place: ''
    };
  }
  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    
  }

}

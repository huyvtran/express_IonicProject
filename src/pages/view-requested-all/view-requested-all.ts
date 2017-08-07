import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the ViewRequestedAllPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-view-requested-all',
  templateUrl: 'view-requested-all.html',
})
export class ViewRequestedAllPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afd:AngularFireDatabase) {
       this.items=this.afd.list('/requestedList/requested')

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestedAllPage');
  }

}

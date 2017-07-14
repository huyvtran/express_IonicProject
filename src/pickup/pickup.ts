import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, LoadingController } from 'ionic-angular';
declare var google;




@Component({
   selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupDirective implements OnInit  {
    public map:any;
    constructor(public loading:LoadingController,public geo:Geolocation){

    }

    ngOnInit(){
      
    }

}
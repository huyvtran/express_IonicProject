import { StartPage } from './../start/start';
import { Location } from './../../components/models/location';
import { MetroService } from './../../services/metroService';
import { MapDirective } from './../../components/map';
import { Observable, Subscription } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Keyboard} from '@ionic-native/keyboard';
import firebase from 'firebase';
import {AutocompletePage} from './../start/autocomplete';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [MapDirective]
})

export class HomePage implements OnInit,OnChanges  {
  location={} as Location
  Destination:string;
  MyLocation:any;
  geoCode:boolean=false;
  isPickupRequested:boolean=false;
  start:string;
  address:any;
  destination:string;
  startLat:any;
  startLng:any;
  @Input() test:any;
  public isactive:any;
  firestore=firebase.database().ref('/pushtokens');
  firemsg=firebase.database().ref('/messages');
  constructor(public navCtrl: NavController,public navParam:NavParams ,public modalCtrl:ModalController, public loading:LoadingController, public fb:FirebaseService, 
    private geo:Geolocation,private afDatabase:AngularFireDatabase,public keyboard:Keyboard
  ,public metro: MetroService) {
    
    this.address = {
      place: ''
    };
    if(this.navParam.get("location")===null||this.navParam.get("location")==undefined){

    }else{
      alert(this.navParam.get("location"))
    }
   
  }
  entered(){
     let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.startLat=data.lat;
      this.startLng=data.lng;
    });
    modal.present();
  }
 
  ionViewDidLoad(){
  //  window.addEventListener('native.keyboardshow', keyboardShowHandler);
  //   window.addEventListener('native.keyboardhide', keyboardHideHandler);

function keyboardHideHandler(e){
   alert("hide"+e);
}
    function keyboardShowHandler(e){
      alert("show"+e);
    }
  }
  
  starting(value){
    this.start=value;
    console.log("get value : "+value);
  }
  ending(value){
    this.destination=value;
  }
  drag_second(trigger){
        console.log("dragged222222"+trigger);
        var upper=document.getElementById("upper");
        console.log(upper);
        if(trigger){

        upper.setAttribute('class','upper isactive');
        }else{
          upper.removeAttribute('class');
          upper.setAttribute('class','upper');
        }
    }
  ngOnChanges() {
    console.log("change"+this.test);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    console.log("Homepage on change");
  }
  ngOnInit(){
    //this.calculateAndDisplayRoute();
    
  }
  cancelPickUp(){
    this.isPickupRequested=false;
  }
  confirmPickUp(){
    this.isPickupRequested=true;
  }
  getGeoCoding(){
    this.geoCode=true;
  }

    calculateAndDisplayRoute() {
      console.log("sdss");
       console.log(this.afDatabase);
        var that=this.fb;
        var location=this.location;
        var flightPlanCoordinates=[];
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat:  37.4788183, lng: 127.0516374}
        });
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
             var myLatLng = {lat: pos.lat, lng: pos.lng};
             console.log("2");
                   console.log(that);
            var count=0;

             setInterval(() =>{
               console.log("starting setinterval2");
               count++;
      //         that.object('profile/user_id/'). set({massege:'haha',haha:'ns'})
      // .then(() => alert("ddssss"))
      // .catch((error)=> console.log("err : "+error))
              navigator.geolocation.getCurrentPosition(function(position){
                var pos1 = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                  
                };

                 location.lat=position.coords.latitude;
                location.lng=position.coords.longitude;
                // alert(count+": "+location.lat+","+location.lng);
                 location.lat=position.coords.latitude;
                location.lng=position.coords.longitude;
                var now=new Date();
                location.create_date=new Date();
               //that.addMapLocation(location);
                flightPlanCoordinates.push({lat:position.coords.latitude,lng:position.coords.longitude})
                var flightPlanCoordinates2 = [
          {lat:  37.478898852648925, lng: 127.05001801602016},
          {lat:  37.47854141742287, lng: 127.04825311452312},
          {lat:  37.478895414589296, lng: 127.0502639543466},
          {lat:  37.47890077067915, lng: 127.05022291557128}
        ];
        console.log("start");
        console.log(flightPlanCoordinates);
        console.log(flightPlanCoordinates2);
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        myLatLng={lat:position.coords.latitude,lng:position.coords.longitude}
        console.log("myLatLng")
        console.log(myLatLng);
        
        flightPath.setMap(map);
               let marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: myLatLng
              })
             
        });
    },30000)
             let marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: myLatLng
        });
        map.setCenter(pos);
            console.log(pos.lat+"lng2222 : "+pos.lng);
          }, function(data) {
            console.log(data);
          });
        } 
      }

      addMarker(){
        console.log("sssssss");
      }


}

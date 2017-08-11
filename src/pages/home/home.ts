import { MetroServiceProvider } from './../../providers/metro-service/metro-service';
import { ViewRequestListPage } from './../view-request-list/view-request-list';
import { ViewRequestedAllPage } from './../view-requested-all/view-requested-all';
import { request } from './../../components/models/request';
import { LoginPage } from './../login/login';
import { EndPage } from './../end/end';
import { StartPage } from './../start/start';
import { Http,Headers ,RequestOptions} from '@angular/http';
import { Location } from './../../components/models/location';
import { MetroService } from './../../services/metroService';
import { MapDirective } from './../../components/map';
import { Observable, Subscription } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './../../providers/firebase-service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController, Platform } from 'ionic-angular';
import {Keyboard} from '@ionic-native/keyboard';
import firebase from 'firebase';
import {AutocompletePage} from './../start/autocomplete';
import { AngularFireAuth } from 'angularfire2/auth';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [MapDirective]
})

export class HomePage implements OnInit,OnChanges  {
  location={} as Location
  request={} as request
  Destination:string;
  MyLocation:any;
  geoCode:boolean=false;
  isPickupRequested:boolean=false;
  start:string;
  address:any;
  destination:string;
  startLat:any;
  startLng:any;
  endLat:any;
  endLng:any;
  tokenId:string;
  activePage:any;
  startPoint:string;
  @Input() test:any;
  public isactive:any;
  interval:any;
  endPoint:string;
  userId:string;
  items:any;
  isToggled:boolean=false;
  pages: Array<{title:string,component:any}>;
  requestedRoute=[];
  firestore=firebase.database().ref('/pushtokens');
  firemsg=firebase.database().ref('/messages');
  result_metro:any;
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  constructor(public navCtrl: NavController,public navParam:NavParams ,public mapDirective:MapDirective, public modalCtrl:ModalController, public loading:LoadingController, public fb:FirebaseService, 
    private geo:Geolocation,private afDatabase:AngularFireDatabase,public afAuth : AngularFireAuth
  ,public metro: MetroServiceProvider,private oneSignal: OneSignal, public platform:Platform,private backgroundGeolocation: BackgroundGeolocation,public http:Http) {
    var id=localStorage.getItem("id");
    console.log("metrometro")
    var result_metro=this.metro.getMetro().subscribe(data=>{
      console.log("result_Metro")
      console.log(data);
      this.result_metro=data;
    });
    if(id!=undefined||id!=null){
      this.userId=id;
    }else{
      this.userId="admin"
    }
    if(this.platform.is('android')){
    //    window["plugins"].OneSignal
    //                     .startInit("2192c71b-49b9-4fe1-bee8-25617d89b4e8", "916589339698")
    //                     .handleNotificationOpened(notificationOpenedCallback)
    //                     .endInit();
    //                      var notificationOpenedCallback = function(jsonData) {
    //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    //     alert(JSON.stringify(jsonData))
    // };
    }
   
    
 this.items=this.afDatabase.list('/requestedList/requested', { preserveSnapshot: true })
       this.items.subscribe(snapshots=>{
        console.log("snapshot????????????????????????????")
        console.log(snapshots);
        snapshots.forEach(element => {
          console.log(element.key);
          console.log(element.val().startLat);
          this.requestedRoute.push({lat:element.val().startLat,lng:element.val().startLng},{lat:element.val().endLat,lng:element.val().endLng})
          console.log(this.requestedRoute);
        });
    })

  
    // localStorage.setItem("lastname", "Smith");
    // alert(localStorage.getItem("lastname"));
    this.pages=[
        
        {title:'page 2',component:HomePage},
        {title:'Log in',component:LoginPage},
        {title:'View Request List',component:ViewRequestListPage}
      ]
      this.activePage=this.pages[0];
    this.address = {
      place: ''
    };
   //this.startTracking();
  }
 
  viewRequestedAll(){
    this.navCtrl.push(ViewRequestedAllPage,{userId:this.userId})
  }
   openPage(page){
    this.navCtrl.setRoot(page.component);
    this.activePage=page;
  }
  checkActive(page){
    return page==this.activePage;
  }
  endingPoint(){
     let modal = this.modalCtrl.create(EndPage);
    let me = this;
    modal.onDidDismiss(data => {
      if(data!=null){
        this.endPoint=data.endloc;
      this.endLat=data.endlat;
      this.endLng=data.endlng;
      }
      
    });
    modal.present();
  }
  entered(){
    
     let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      if(data!=null){
        console.log("modalOn")
        console.log(this.result_metro);
        for(var i=0; i<this.result_metro.length; i++){
          var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(data.lat,data.lng),
                                                                              new google.maps.LatLng(this.result_metro[i].XPOINT_WGS, this.result_metro[i].YPOINT_WGS));       
          distance=distance/1000;
          distance=distance.toFixed(2);
          console.log(this.result_metro[i].STATION_NM+","+distance)
        }
        this.startPoint=data.loc;
      this.startLat=data.lat;
      this.startLng=data.lng;
      }
      
    });
    modal.present();
  }
 
  ionViewDidLoad(){
  //  window.addEventListener('native.keyboardshow', keyboardShowHandler);
  //   window.addEventListener('native.keyboardhide', keyboardHideHandler);


  }
  
  starting(value){
    this.start=value;
    console.log("get value : "+value);
  }
  ending(value){
    this.destination=value;
  }
  requesting(){
    if(this.startPoint==undefined||this.endPoint==undefined){
      alert("출발역, 도착역을 입력해주세요")
     
        
    }else{
      
var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.startLat, this.startLng),
 new google.maps.LatLng(this.endLat, this.endLng));       
      distance=(parseInt(distance)/1000);
      
      this.request.startPoint=this.startPoint;
      this.request.endPoint=this.endPoint;
      let today = new Date();
        let dd:number;
        let day:string;
        let month:string;
         dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
       var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric"});
       console.log("time:"+time);
       
        dd<10?day='0'+dd:day=''+dd;
        mm<10?month='0'+mm:month=''+mm;
        
	    let today_today = yyyy+'/'+month+'/'+day+' '+time;
  console.log(today_today);
      this.request.user=this.userId
      this.request.create_date=today_today;
      this.request.status="requested";
      this.request.startLat=this.startLat;
      this.request.startLng=this.startLng;
      this.request.endLat=this.endLat;
      this.request.endLng=this.endLng;
      if(this.platform.is('android')){
      //   window["plugins"].OneSignal.getIds((idx)=>{

      //    this.request.tokenId=idx.userId
      //     this.afDatabase.list('/requestedList/requestedAll/').push(this.request)
      //     this.afDatabase.list('/requestedList/requested/').push(this.request).then((success)=>{
      //   this.afAuth.authState.subscribe(auth=>{
      //     if(auth!=null||auth!=undefined){
      //     this.afDatabase.list('/profile/'+auth.uid+'/request').push(this.request).then((success)=>{
      //     }).catch((error)=>{
      //       alert(error);
      //     })
      //     }
          
      //   })
      // }).catch((error)=>{
      //   alert(error);
      // })
      // })
      }else{
        alert("웹에서는 사용불가");
      }
       
     
      
      
    }
   
  }
  drag_second(trigger){
        var upper=document.getElementById("upper");
        console.log(upper);
        if(trigger){

        // upper.setAttribute('class','upper isactive');
        console.log("trigger true")
        }else{
          // upper.removeAttribute('class');
          // upper.setAttribute('class','upper');
          console.log("trigger false")
        }
    }
  notify(){
    let options={timeout:5000,maximumAge :5000,enableHighAccuracy:true}
    
      this.geo.getCurrentPosition(options).then(resp=>{
      let lat=resp.coords.latitude;
      let lng=resp.coords.longitude;
      this.location.lat=lat;
      this.location.lng=lng;
      let today = new Date();
        let dd:number;
        let day:string;
        let month:string;
         dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
       var time=new Date().toLocaleTimeString('en-US', { hour12: false,hour: "numeric",minute: "numeric"});
       console.log("time:"+time);
       
        dd<10?day='0'+dd:day=''+dd;
        mm<10?month='0'+mm:month=''+mm;
        
	    let today_today = yyyy+'/'+month+'/'+day+' '+time;
  console.log(today_today);
  this.location.create_date=today_today;
  this.location.isactive=true;
  this.location.userid=this.userId;
      if(this.isToggled){
        this.interval=setInterval(()=>{
           this.afDatabase.list("employees_status/AllUser/"+this.userId).remove()
          this.afDatabase.object("employees_status/AllUser/"+this.userId).set(this.location);
          this.afDatabase.list("employees_status/Available/"+this.userId).remove()
          this.afDatabase.object("employees_status/Available/"+this.userId).set(this.location);
          
          this.afDatabase.list("employees_status/NotAvailable"+this.userId).remove()
        },5000)
     
    }else{
      clearInterval(this.interval);
      this.interval.sto
      this.location.lat=0;
      this.location.lng=0;
      this.afDatabase.list("employees_status/AllUser/"+this.userId).remove()
      this.afDatabase.object("employees_status/AllUser/"+this.userId).set(this.location)
       this.afDatabase.object("employees_status/NotAvailable/"+this.userId).set(this.location)
        this.afDatabase.list("employees_status/Available/"+this.userId).remove()
  
        
    }
    }).catch((error =>{
        alert(error);
    }))
      
    //toggled to activate tracking location.
    

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

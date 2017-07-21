import { LocationTracker } from './../providers/location-tracker/location-tracker';
import { PickupCar } from './pickup-car/pickup-car';
import { CarProvider } from './../providers/car/car';
import { PickupDirective } from './../pickup/pickup';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, LoadingController } from 'ionic-angular';
import { AvailbleCarDirective } from './available-cars/available-cars';
import { NativeGeocoder,NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';

declare var google;

@Component({
   selector: 'map',
  templateUrl: 'map.html',
   entryComponents: [PickupDirective,AvailbleCarDirective,PickupCar],
     providers:[CarProvider,PickupDirective]
})
export class MapDirective implements OnInit,OnChanges  {
    @Input() isPickupRequested:boolean;
    @Input() startstn:string;
    @Input() endstn:string;
    @Output() starting : EventEmitter<any>=new EventEmitter();
    @Output() ending : EventEmitter<any>=new EventEmitter();
    @Output() drag_second : EventEmitter<any>=new EventEmitter();
    public refreshing:boolean=false;
    public map:any;
    public geocoder:any;
    public isMapIdle:boolean;
    public currentLocation:any;
    full_address:string = "hahaha"
    public full="";
    lat:number;
    lng:number;
    
    constructor(public loading:LoadingController,public geo:Geolocation,public pick:PickupDirective
    ,private nativeGeocoder: NativeGeocoder,public lt:LocationTracker){
        this.full_address='jsjs';
        this.lt.startTracking();
        
    }
    dragging(trigger){
        console.log("dragged"+trigger);
        if(trigger){
            this.drag_second.next(true);    
        }else{
            this.drag_second.next(false);
        }
    }
    ngOnChanges() {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        console.log("map changed");
        console.log(this.startstn+","+this.endstn);
        if(this.startstn!=null||this.startstn!=undefined){
            console.log("map changed2");
            this.starting.next(this.startstn);
        }
        if(this.endstn!=null||this.endstn!=undefined){
            console.log("map changed2");
            this.ending.next(this.endstn);
        }
        
    }
    getGeoCoding(lat,lng){
        console.log("ful"+lat+","+lng);
        var full=this.full_address;
        let request = {
                  latLng: {lat:lat,lng:lng}
                };  
        this.geocoder=new google.maps.Geocoder();
        this.geocoder.geocode(request,  (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0] != null) {
                                         
                       let city=results[0].address_components[results[0].address_components.length-3].short_name; 
                       let gu = results[0].address_components[results[0].address_components.length-4].short_name;    
                       let dong=results[0].address_components[results[0].address_components.length-5].short_name; 
                       let detail=results[0].address_components[results[0].address_components.length-6].short_name; 
                       console.log("this.full_address"+ this.full_address);
                       this.full_address=city+" "+gu+" "+dong+" "+detail;
                       console.log("this.full_address2"+ this.full_address);
                      } else {
                        alert("No address available");
                      }
                    }
                  });
        // this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
        // .then((result: NativeGeocoderReverseResult) => console.log('The address is ' + result.street + ' in ' + result.countryCode))
        // .catch((error: any) => console.log(error));
    }
    ngOnInit(){
        this.map=this.createMap();
        this.addMapEventListener();
        this.getCurrentLocation2().subscribe(location=>{
      this.centerLocation(location)
        });
    }
    centerLocation_refresh(location){

    }
centerLocation(location){
    if(location){
      
        this.map.panTo(location);
    }else{
        console.log("refreshing")
        this.pick.removePickupMarker();
        this.isMapIdle=false;
        this.getCurrentLocation2().subscribe(currentLocation=>{
        console.log("s"+currentLocation);
         this.map.panTo(currentLocation);    
            
        });
    }
  }
  
  updatedPickupLocation(location){
    this.currentLocation=location;
    this.centerLocation(location);
  }
  addMapEventListener(){
    google.maps.event.addListener(this.map,'dragstart',(event)=>{
        console.log("addMapEventListener dragging"+event);
        this.isMapIdle=false;
    })
    google.maps.event.addListener(this.map,'idle',(event)=>{
        console.log("idle"+event);
        console.log(this.refreshing);
        if(this.refreshing){
            this.refreshing=false;
        }
        this.isMapIdle=true;
      
    })

    // google.maps.event.addListener(this.map,'mouseup',(event)=>{
    //     console.log("mouseup????????????"+event.latLng.lat()+","+event.latLng.lng());
    //     console.log(event);
    //     this.getGeoCoding(event.latLng.lat(),event.latLng.lng());
        
    //     this.lat=event.latLng.lat();
    //     this.lng=event.latLng.lng();
    //     this.isMapIdle=true;
    // })

   
  }
    createMap(location=new google.maps.LatLng(37.5665,126.9780)){
        let mapOptions={
            center:location,
            zoom:15,
            disableDefaultUI: true
        }
        let mapEl=document.getElementById('map');
        let map=new google.maps.Map(mapEl,mapOptions);
        console.log("this is map");
        console.log(map);
        return map;
    }
      getCurrentLocation2(){
    let loading=this.loading.create({
      content:'locating.......'
    })
    loading.present().then(()=>{
    })
    let options={timeout:5000,maximumAge :5000,enableHighAccuracy:true}
    let locationObs=Observable.create(observable =>{
      this.geo.getCurrentPosition(options).then(resp=>{
      let lat=resp.coords.latitude;
      let lng=resp.coords.longitude;
      console.log(lat+","+lng);
      console.log("11");
      alert("lat lng"+lat+","+lng);
      let location=new google.maps.LatLng(lat,lng);
      this.map.panTo(location);
      loading.dismiss();
    }).catch((error =>{
        alert(error);
        loading.dismiss();
    }))
    
    })
    return locationObs
  }
}
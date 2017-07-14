import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, LoadingController } from 'ionic-angular';
declare var google;




@Component({
   selector: 'map',
  templateUrl: 'map.html'
})
export class MapDirective implements OnInit  {
    public map:any;
    constructor(public loading:LoadingController,public geo:Geolocation){

    }

    ngOnInit(){
        this.map=this.createMap();
        this.getCurrentLocation2().subscribe(location=>{
      this.centerLocation(location)
        });
    }
centerLocation(location){
    if(location){
        this.map.panTo(location);
    }else{
        this.getCurrentLocation2().subscribe(currentLocation=>{
         this.map.panTo(currentLocation);    
            
        });
         
    }
  }
    createMap(location=new google.maps.LatLng(37.5665,126.9780)){
        let mapOptions={
            center:location,
            zoom:15,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ['roadmap', 'terrain']
            }
        }
        let mapEl=document.getElementById('map');
        let map=new google.maps.Map(mapEl,mapOptions);
        console.log("this is map");
        console.log(map);
        return map;
    }
      getCurrentLocation2(){
    let loading=this.loading.create({
      content:'locating...'
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
      let location=new google.maps.LatLng(lat,lng);
      this.map.panTo(location);
      loading.dismiss();
    })
    
    })
    return locationObs
  }
}
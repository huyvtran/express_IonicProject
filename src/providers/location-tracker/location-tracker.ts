import { FirebaseService } from './../firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import { BackgroundGeolocation,BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Location } from './../../models/location';
 
@Injectable()
export class LocationTracker {
 location={} as Location;
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
 
  
constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation, private fs:FirebaseService, private geolocation: Geolocation) {
};
 
  startTracking() {
    let config = {
       desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
 console.log("starting tracking");
  this.backgroundGeolocation.configure(config).subscribe((location) => {
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    // Run update inside of Angular's zone
        this.location.lat=   123;
 this.location.lng= 124;
    this.fs.addMapLocation(this.location);
 
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;

    });
    
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
  // Foreground Tracking
 
let options = {
  frequency: 3000, 
  enableHighAccuracy: true
};
  this.geolocation.watchPosition().subscribe(position => {
    if ((position as Geoposition).coords != undefined) {
      var geoposition = (position as Geoposition);
      console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
      
    } else { 
     
    }
});
// this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
//   console.log(position);
//   this.location.lat=   position.coords.latitude;
//  this.location.lng=  position.coords.longitude;
//     this.fs.addMapLocation(this.location);
//   // Run update inside of Angular's zone
//   this.zone.run(() => {
//     this.lat = position.coords.latitude;
//     this.lng = position.coords.longitude;
//   });
 
// });
  }
 
  stopTracking() {
 
    console.log('stopTracking');
 
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();
  }
 
}
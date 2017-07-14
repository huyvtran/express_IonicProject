import { MapDirective } from './../components/map';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FirebaseService } from '../providers/firebase-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { PickupDirective} from '../pickup/pickup';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../providers/location-tracker/location-tracker';

var config = {
    apiKey: "AIzaSyDaq00hPPCt6AJzJKgCQsYM4JWn9V_6N9w",
    authDomain: "express-2533a.firebaseapp.com",
    databaseURL: "https://express-2533a.firebaseio.com",
    projectId: "express-2533a",
    storageBucket: "express-2533a.appspot.com",
    messagingSenderId: "775932154413"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective
    
  ],
  providers: [
    StatusBar,
    BackgroundGeolocation,
    SplashScreen,
    Geolocation,FirebaseService,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTracker
  ]
})
export class AppModule {}

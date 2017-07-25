import { HttpModule } from '@angular/http';
import { MetroService } from './../services/metroService';
import { PickupCar } from './../components/pickup-car/pickup-car';
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
import { AvailbleCarDirective } from '../components/available-cars/available-cars';
import { NativeGeocoder,NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';

import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { CarProvider } from '../providers/car/car';
import { SimulateProvider } from '../providers/simulate/simulate';
import { AutoCompleteModule } from 'ionic2-auto-complete';
 var config = {
    apiKey: "AIzaSyAfXTGx8Tdyx8y146j83vVtiQPC5T08QUI",
    authDomain: "pushmessage-2c863.firebaseapp.com",
    databaseURL: "https://pushmessage-2c863.firebaseio.com",
    projectId: "pushmessage-2c863",
    storageBucket: "pushmessage-2c863.appspot.com",
    messagingSenderId: "416675547990"
  };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective,
    AvailbleCarDirective,
    PickupCar,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    FormsModule,
    AutoCompleteModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective,
    AvailbleCarDirective,
    PickupCar
    
  ],
  providers: [
    StatusBar,
    BackgroundGeolocation,
    SplashScreen,
    NativeGeocoder,
    Geolocation,FirebaseService,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarProvider,
    SimulateProvider,
    MetroService
  ]
})
export class AppModule {}

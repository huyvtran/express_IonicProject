import { ViewRequestListPage } from './../pages/view-request-list/view-request-list';
import { ViewRequestedAllPage } from './../pages/view-requested-all/view-requested-all';

import { WindowPage } from './../pages/window/window';
import { EndPage } from './../pages/end/end';
import { StartPage } from './../pages/start/start';
import { SignupPage } from './../pages/signup/signup';
import { ProfilePage } from './../pages/profile/profile';
import { LoginPage } from './../pages/login/login';
import { HttpModule } from '@angular/http';
import { MetroService } from './../services/metroService';
import { PickupCar } from './../components/pickup-car/pickup-car';
import { MapDirective } from './../components/map';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FirebaseService } from '../providers/firebase-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { PickupDirective} from '../pickup/pickup';
import { AvailbleCarDirective } from '../components/available-cars/available-cars';
import { NativeGeocoder,NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { GooglePlus } from '@ionic-native/google-plus';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { CarProvider } from '../providers/car/car';
import { SimulateProvider } from '../providers/simulate/simulate';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import firebase from 'firebase';
import {Keyboard} from '@ionic-native/keyboard';
import { Dialogs } from '@ionic-native/dialogs';
import { OneSignal } from '@ionic-native/onesignal';

import {AutocompletePage} from '../pages/start/autocomplete';

  var firebaseConfig = {
     apiKey: "AIzaSyDA8QXihUwFwPuvN2N3Tx44AQQt20wwskk",
    authDomain: "ionic-173108.firebaseapp.com",
    databaseURL: "https://ionic-173108.firebaseio.com",
    projectId: "ionic-173108",
    storageBucket: "ionic-173108.appspot.com",
    messagingSenderId: "916589339698"
  };
  firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective,
    AvailbleCarDirective,
    PickupCar,
    LoginPage,
    ProfilePage,
    SignupPage,
    StartPage,
    AutocompletePage,
    EndPage,
    ViewRequestListPage,
    ViewRequestedAllPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    PickupCar,
    LoginPage,
    ProfilePage,
    SignupPage,
    StartPage,
    AutocompletePage,
    EndPage,
    ViewRequestListPage,
    ViewRequestedAllPage
    
    
  ],
  providers: [
    StatusBar,
    BackgroundGeolocation,
    SplashScreen,
    NativeGeocoder,
    Dialogs,
    Geolocation,FirebaseService,
    AngularFireModule,
    OneSignal,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarProvider,
    SimulateProvider,
    MetroService,
    GooglePlus,AngularFireAuth,Keyboard,MapDirective,PickupDirective,WindowPage
  ]
})
export class AppModule {}

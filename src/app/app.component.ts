import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pages: Array<{title:string,component:any}>;
  activePage:any;
  @ViewChild(Nav) nav:Nav
  constructor(platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.pages=[
        {title:'page One',component:LoginPage},
        {title:'page 2',component:HomePage}
      ]
      var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
          window["plugins"].OneSignal
    .startInit("2192c71b-49b9-4fe1-bee8-25617d89b4e8", "916589339698")
  	.handleNotificationOpened(notificationOpenedCallback)
    .endInit();
 
      this.activePage=this.pages[0];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
    this.activePage=page;
  }
  checkActive(page){
    return page==this.activePage;
  }
}


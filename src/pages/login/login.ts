import { ProfilePage } from './../../pages/profile/profile';
import { User } from './../../components/models/user';
import { SignupPage } from './../signup/signup';
import { HomePage } from './../../pages/home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule} from 'angularfire2';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user={} as User;
    requestToken:any;
  constructor(public navCtrl: NavController,public googleplus:GooglePlus,public afauth:AngularFireAuth) {
  

  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
    async login(user:User){
    try{
      const result=await this.afauth.auth.signInWithEmailAndPassword(user.email,user.password)
      console.log(result);
      if(result){
        this.navCtrl.push(HomePage)

      }else{
        console.log(result.message);
      }
    }catch(e){
      alert("no user found")
    }
    }
  googleLogin(){
    this.googleplus.login({
      'webClientId':'916589339698-n71c3mmpsclus88rk6fp99la7sh0vnga.apps.googleusercontent.com'
    }).then((res)=>{

      alert(res.email);
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(
        suc=>{
          this.navCtrl.setRoot(ProfilePage)
        }).catch(ns=>{
          alert("fail"+ns);
        })
    }).catch((error =>{
      alert(error);
    }))
  }

  
}
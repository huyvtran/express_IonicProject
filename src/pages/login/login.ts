import { AngularFireDatabase } from 'angularfire2/database';
import { PhoneNumber } from './../../components/models/phonenumber';
import { ProfilePage } from './../../pages/profile/profile';
import { User } from './../../components/models/user';
import { SignupPage } from './../signup/signup';
import { HomePage } from './../../pages/home/home';
import { Component, OnInit } from '@angular/core';
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
export class LoginPage implements OnInit {
  windowRef:any;
  user={} as User;
  phoneNumber = new PhoneNumber()

  verificationCode: string;

  users: any;
    requestToken:any;
  constructor(public navCtrl: NavController,public googleplus:GooglePlus,public afauth:AngularFireAuth,public afd:AngularFireDatabase) {
  
   

  }
  ngOnInit(){
      var ref = this.afd.database.ref("profile");
        firebase.database().ref().on('value', function(snapshot) {
            // Do whatever
            alert("new");
        });
     this.windowRef=window;
    this.windowRef.RecaptchaVerifier= new firebase.auth.RecaptchaVerifier('sign-in-button')
    this.windowRef.RecaptchaVerifier.render()
  }
  get windowR(){
    return window;
  }
  verifyLoginCode(){
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result=>{
      console.log("result success");
      console.log(result);
      console.log(result.user);
    })
  }
  signup(){
    // this.navCtrl.push(SignupPage);
    const appVerifier=this.windowRef.RecaptchaVerifier;
    this.phoneNumber.country="82"
    this.phoneNumber.area="010"
    this.phoneNumber.prefix="7999"
    this.phoneNumber.line="8598"
    const num=this.phoneNumber.e164;
    const re=firebase.auth().signInWithPhoneNumber(num,appVerifier).then(result=>{
      console.log(result);
      this.windowRef.confirmationResult=result;
    }).catch(error=>{
      alert("error : "+error);
    })
    console.log("rrr");
    console.log(re);
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
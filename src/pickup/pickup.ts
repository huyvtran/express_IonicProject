import { CarProvider } from './../providers/car/car';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, LoadingController } from 'ionic-angular';
declare var google;


@Component({
   selector: 'pickup',
  templateUrl: 'pickup.html',
    providers:[CarProvider]
})
export class PickupDirective implements OnChanges  {
    @Input() isPinSet:boolean;
    @Input() map:any;
    @Input() refreshing:any;
    @Input() lat:number;
    @Input() lng:number;
    @Output() updatedPickupLocation : EventEmitter<any>=new EventEmitter();
    @Output() dragging : EventEmitter<any>=new EventEmitter();
    private pickupMarker: any;
    private popup:any;
    public isactive:any;
    constructor(public loading:LoadingController,public geo:Geolocation){

    }
    ngOnChanges(changes){
         console.log("changed "+changes);
        console.log(this.isPinSet);
        console.log("locator!!!!");
        console.log(this.refreshing);
      
      if(this.isPinSet){
        // this.showPickupMarker();

         this.dragging.next(false);
      }else if(!this.isPinSet&&this.isPinSet!==undefined){
          console.log("???????????????????"+this.isPinSet);
          this.dragging.next(true);
          this.removePickupMarker();
      }else{
          console.log("!!!!!!!!!!!!!!!!!!!!!!!"+this.isPinSet);
          this.dragging.next(false);
      }
    }
    ngOnInit(){
        console.log("pickupDirector come");
     }
    removePickupMarker(){
         this.isactive=true;
        console.log("removing");
        console.log(this.pickupMarker);
        if(this.pickupMarker){
            console.log("null로 만든다");
            this.pickupMarker.setMap(null);
        }
        if(this.pickupMarker==null||this.pickupMarker=='undefined'){
            console.log("nullify");
        }
    }
    
    showPickupTime(){
        this.popup=new google.maps.InfoWindow({
            content:'<h5>You are Here </h5>'
        });
        this.popup.open(this.map,this.pickupMarker);
        google.maps.event.addListener(this.pickupMarker,'click',()=>{
            this.popup.open(this.map,this.pickupMarker);
        })
        //pass pickup marker to updatedpickuplocation
        this.updatedPickupLocation.next(this.pickupMarker.getPosition())
    }
    showPickupMarker(){
       
        this.isactive=false;
         console.log("showPickupMakrer!!!!!!!!!!!!!!")
         console.log(this.lat+",,,"+this.lng);
       
         console.log(this.map.getCenter())
         console.log(latLng);
         var latLng={lat:this.lat, lng:this.lng+0.035}
         console.log(latLng);
        this.pickupMarker=new google.maps.Marker({
            map : this.map,
            position:this.map.getCenter(),
            animation: google.maps.Animation.BOUNCE,
            icon:'assets/icon/map-marker.png'
        })

        setTimeout(()=>{
            console.log("setTimeOut");
            this.pickupMarker.setAnimation(null)
        },750)
        //this.showPickupTime();
    }
}
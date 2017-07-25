import { CarProvider } from './../../providers/car/car';
import { Component ,Input,OnInit} from '@angular/core';
import * as SlidingMarker from 'marker-animate-unobtrusive';

declare var google;

@Component({
   selector: 'available-cars',
  templateUrl: 'available-cars.html',
  providers:[CarProvider]
})
export class AvailbleCarDirective implements OnInit  {
    @Input() isPickupRequested:boolean;
    @Input() map:any;
    public carMarkers:Array<any>;
    popup:any;
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.fetchAndRefreshCars();
    }
    constructor(public carService:CarProvider){
        this.carMarkers=[];
    }
    deleteCarMarker(){
        this.carMarkers=[];
    }
    updateCarMarker(car){
        var numofCars=this.carMarkers.length;
        console.log("length2 : "+this.carMarkers.length);
        console.log(car.isactive);
        for(var i=0; i<this.carMarkers.length; i++){
            
            if(car.isactive=="false"){
                console.log("isactive 가 false 임"+car.id+","+this.carMarkers[i].id);
                if(car.id==this.carMarkers[i].id){
                    this.carMarkers[i].set('isactive',car.isactive);
                    console.log(this.carMarkers[i]);
                }
            }else{
                 if(car.id==this.carMarkers[i].id){
                    this.carMarkers[i].set('isactive',car.isactive);
                   
                    console.log("true 다다다다다"+car.id+","+this.carMarkers[i].id);
                this.carMarkers[i].setVisible(true);
                }
                
            }
            // this.carMarkers[i].set('isactive',car.isactive);
            
            
            
        }
        console.log(this.carMarkers);
        console.log("??"+this.carMarkers.length+","+numOfCars);
        for(var i=0,numOfCars=this.carMarkers.length;  i < numofCars; i++){
            console.log("length333"+i)
            
            if(this.carMarkers[i].id===car.id){
                if(this.carMarkers[i].isactive=="false"){
                this.carMarkers[i].setVisible(false);
                 return
                }else{
                    this.carMarkers[i].setVisible(true);
                 return
                }
            }
            console.log("setvisible");
            console.log(this.carMarkers);
        }
        
        this.addCarMarker(car);
    }
    addCarMarker(car){
       
        
        let carMarker=new google.maps.Marker({
            map:this.map,
            position : new google.maps.LatLng(car.coord.lat,car.coord.lng),
            icon : 'assets/icon/map-marker.png'
        })
      
        carMarker.set('lat',car.coord.lat);
        carMarker.set('id',car.id);
        carMarker.set('lng',car.coord.lng);
        carMarker.set('userid',car.userid);
        carMarker.set('created_date',car.created_date);
        carMarker.set('isactive',car.isactive);
        let popup=new google.maps.InfoWindow({
            content:'<h5>'+car.userid+'</h5>\n<h5>'+car.created_date+'</h5>'
        });
        carMarker.addListener('click',()=>{
              popup.open(this.map,carMarker);
              alert(car.userid);
        })
        
        this.carMarkers.push(carMarker);
        console.log("add car marker");
        console.log(this.carMarkers);
        console.log(this.carMarkers.length);
    }
    fetchAndRefreshCars(){
        this.carService.getCars(9,9)
        .subscribe(cars_array=>{
            if(!this.isPickupRequested){
               (<any>cars_array).forEach(car=>{
                   console.log("car : ");
                   console.log(car);
                   this.updateCarMarker(car);
               })
            }
        })
    }
}
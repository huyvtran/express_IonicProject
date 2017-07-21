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
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.fetchAndRefreshCars();
    }
    constructor(public carService:CarProvider){
        this.carMarkers=[];
    }
    updateCarMarker(car){
        var numofCars=this.carMarkers.length;
        for(var i=0,numOfCars=this.carMarkers.length;  i < numofCars; i++){
            if(this.carMarkers[i].id===car.id){
                this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat,car.coord.lng))
                 return
            }
           
        }
        this.addCarMarker(car);
    }
    addCarMarker(car){
        let carMarker=new SlidingMarker({
            map:this.map,
            position : new google.maps.LatLng(car.coord.lat,car.coord.lng),
            icon : 'assets/icon/map-marker.png'
        })
        carMarker.setDuration(1000)
        carMarker.setEasing('linear')

        carMarker.set('id',car.id);
        this.carMarkers.push(carMarker);
    }
    fetchAndRefreshCars(){
        this.carService.getCars(9,9)
        .subscribe(carData=>{
            if(!this.isPickupRequested){
               (<any>carData).cars.forEach(car=>{
                 
                   this.updateCarMarker(car);
               })
            }
        })
    }
}
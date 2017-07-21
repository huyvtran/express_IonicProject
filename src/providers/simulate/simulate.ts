import { FirebaseService } from './../../providers/firebase-service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var google;
/*
  Generated class for the SimulateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SimulateProvider {
  public directionsService:any;
  public myRoute:any;
  public myRouteIndex:number;
  coord:any;
  constructor(public fb:FirebaseService) {
    this.directionsService=new google.maps.DirectionsService();
    this.coord=fb.getLocation();
    console.log('Hello SimulateProvider Provider');
    console.log(this.coord);
  }
  getCars(lat,lng){
    let carData=this.cars[this.carIndex];
    this.carIndex++;
    if(this.carIndex>this.cars.length-1){
      this.carIndex=0;
    }
    return Observable.create(
      observer=>observer.next(carData)
    )
  }
  calculateRoute(start,end){
    console.log(start+","+end);
    console.log("calculateRoute")
    return Observable.create(observable =>{

      this.directionsService.route({
        origin:start,
        destination:end,
        travelMode:google.maps.TravelMode.DRIVING
      },(response,status)=>{
        if(status===google.maps.DirectionsStatus.OK){
          observable.next(response);
        }else{
          console.log(status);
          return;
        }
      })
    })
  }
  getSegmentedDirections(directions){
    let route=directions.routes[0];
    let legs=route.legs;
    let path=[];
    let increments=[];
    let duration=0;

    let numOfLegs=legs.length;
    while(numOfLegs--){
      let leg=legs[numOfLegs];
      let steps=leg.steps;
      let numOfSteps=steps.length;
      while(numOfSteps--){
        let step=steps[numOfSteps];
        let points=step.path;
        let numOfPoints=points.length;

        duration+=step.duration.value;
        while(numOfPoints--){
          let point =points[numOfPoints];   
          path.push(point);
          increments.unshift({
            position:point,  //car position
            time:duration,  //time elft before arrival
            path:path.slice(0)  //clone array to prevent referencing final path array
          })


        }
      }
    }

    return increments;
  }
  simulateRoute(start,end){
    console.log("simulateRoute"+start+","+end);
    return Observable.create(observable=>{
      this.calculateRoute(start,end).subscribe(directions=>{
        //get route path
        this.myRoute=this.getSegmentedDirections(directions);
        this.getPickupCar().subscribe(car=>{
          observable.next(car);
        })


        //return pickup car
      })
    })
  }
  findPickupCar(pickupLocation){

    this.myRouteIndex=0;
    let car=this.cars1.cars[0];
    let start=new google.maps.LatLng(car.coord.lat,car.coord.lng);
    let end=pickupLocation;

    return this.simulateRoute(start,end);
  }
  getPickupCar(){
    return Observable.create(observable=>{
      let car=this.myRoute[this.myRouteIndex];
      observable.next(car);
      this.myRouteIndex++;
    })
  }
  private carIndex:number=0;
  private cars5={
    cars:[
      {
        id:1,
        coord:{
          lat:37.478619,
          lng:127.045823
        }
      },
      {
        id:2,
        coord:{
          lat:37.480126,
          lng:127.048033
        }
      }
    ]
  };

  private cars1={
    cars:[
      {
        id:1,
        coord:{
         lat:37.479062,
          lng:127.049611
        }
      },
      {
        id:2,
        coord:{
          lat:37.479147,
          lng:127.046649
        }
      }
    ]
  };

  private cars2={
    cars:[
      {
        id:1,
        coord:{
          lat:37.478680,
          lng:127.048600
        }
      },
      {
        id:2,
        coord:{
           lat:37.479615,
          lng:127.046746
        }
      }
    ]
  };

  private cars3={
    cars:[
      {
        id:1,
        coord:{
           lat:37.478695,
          lng:127.047600
        }
      },
      {
        id:2,
        coord:{
           lat:37.480066,
          lng:127.046907
        }
      }
    ]
  };

  private cars4={
    cars:[
      {
        id:1,
        coord:{
           lat:37.476600,
          lng:127.049700
        }
      },
      {
        id:2,
        coord:{
           lat:37.480075,
          lng:127.047476
        }
      }
    ]
  };

  public cars:Array<any>=[this.cars1,this.cars2,this.cars3,this.cars4,this.cars5]
}

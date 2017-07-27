import { HomePage } from './../home/home';
import { Component,Output } from '@angular/core';
import { NgZone  } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
declare var google;
@Component({
  templateUrl: 'autocomplete.html'
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();

  constructor (public navCtrl: NavController, public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  
  dismiss() {
    this.viewCtrl.dismiss({location:'haha'});
  }

  chooseItem(item: any) {
    alert(item);
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
      console.log("updateSearch")
      console.log(this.autocomplete.query);
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query,  componentRestrictions: {country: 'Kr'} }, function (predictions, status) {
      console.log(predictions);
      console.log(status);
      console.log("getttttttt");
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions!=null){
          predictions.forEach(function (prediction) {
          
          me.autocompleteItems.push(prediction.description.substring(10));
        });
        }else{
          console.log("prediction == null"+predictions);
        }
        
      });
    });
  }
}
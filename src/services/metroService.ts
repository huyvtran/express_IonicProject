import { Observable } from 'rxjs/Observable';
import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class MetroService implements AutoCompleteService {
  labelAttribute = "name";

  constructor(private http:Http ) {
    var obj;
    
  }
  getResults(keyword:string):Observable<any> {
    console.log("keyword 22233: "+keyword);
    alert("s");
    return this.http.get('/assets/metro.json')
      .map(
        result =>
        {
          alert(result.json().DATA);
          console.log(result.json().DATA.filter(item => item.STATION_NM.toLowerCase().startsWith(keyword.toLowerCase()) ))
          return result.json().DATA
            .filter(item => item.STATION_NM.toLowerCase().startsWith(keyword.toLowerCase()) )
        }, err=>{
          alert("err : "+err);
        });
    // return this.http.get('/assets/metro.json')
    // .map((response: any) => {
    //     console.log("mock data");
    //     console.log(response.json().filter(item => item.STATION_NM.toLowerCase().startsWith(keyword.toLowerCase()) ));
    //     console.log(response.json().filter(item => item.STATION_NM.charAt(0)));
    //     return response.json();
    // })
        
       
  }
 
   
}


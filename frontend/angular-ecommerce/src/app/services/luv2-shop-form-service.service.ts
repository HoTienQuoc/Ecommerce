import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormServiceService {
  private countriesUrl = "http://localhost:8080/api/countries";
  private statesUrl = "http://localhost:8080/api/states";


  constructor(private httpClient: HttpClient){}

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)//returns an observable
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{
    // search Url 
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)//returns an observable
    );
  }

  getCreditCardMonth(startMonth: number):Observable<number[]>{
    let data: number[] = [];

    //build an array for "Month" dropdown list
    //- start at current month and loop until
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);      
    }

    return of(data);//the "of" operator from rxjs will wrap an object as an Observable
  }

  getCreditCardYear():Observable<number[]>{
    let data: number[] = [];

    //build an array for "Year" dropdown list
    //- start at current year and loop for next 10 year
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear+10;


    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);      
    }

    return of(data);//the "of" operator from rxjs will wrap an object as an Observable
  }

}

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
    //unwraps the Json from Spring Data Rest _embedded entry
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
    //unwraps the Json from Spring Data Rest _embedded entry
  }
}

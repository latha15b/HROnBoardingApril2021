import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { PersonalDetails } from "./personaldetails.model";
import { catchError } from "rxjs/operators";
import { State } from './state.model';
import { City } from "./city.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class PersonalDetailsRestDataSource
{
    constructor(private http: HttpClient,
        @Inject(REST_URL) private url: string) {}
    
    getData(): Observable<PersonalDetails[]> 
    {
        return this.sendRequest<PersonalDetails[]>("GET",this.url);
    }

    getDataById(employeeId: number): Observable<PersonalDetails> 
    {
        return this.sendRequest<PersonalDetails>("GET",`${this.url}/${employeeId}`);
    }
    getState(): Observable<State[]>
    {
        console.log(this.url+"/GetAllStateDetails/");
        return this.sendRequestState<State[]>("GET",this.url+"/GetAllStateDetails/")
    }

    getCities(stateID: number): Observable<City[]>
    {
        console.log(this.url+"/GetAllCityDetailsById/"+stateID);
        return this.sendRequestCity<City[]>("GET",this.url+"/GetAllCityDetailsById/"+stateID);
    }
    getCitiesByStateName(stateName: string): Observable<City[]>
    {
        console.log(this.url+"/GetAllCityDetailsByStateName/"+stateName);
        return this.sendRequestCity<City[]>("GET",this.url+"/GetAllCityDetailsByStateName/"+stateName);
    }

    savePersonalDetails(personaldetails: PersonalDetails) : Observable<PersonalDetails> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, personaldetails);
    }

    updatePersonalDetails(personaldetails: PersonalDetails): Observable<PersonalDetails>
    {
        console.log("datasouce");
        return this.sendRequest<PersonalDetails>("PUT", `${this.url}/${personaldetails.employeeId}`,personaldetails);
    }

    deletePersonalDetails(id: number): Observable<PersonalDetails>
    {
        return this.sendRequest<PersonalDetails>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: PersonalDetails) : Observable<T>
    {
        console.log(verb);
        console.log(url);
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);

        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }

    private sendRequestState<T>(verb: string, url: string, body?: State) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);

        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }

    private sendRequestCity<T>(verb: string, url: string, body?: City) : Observable<T>
    {
        // let myHeaders = new HttpHeaders();
        // myHeaders = myHeaders.set("Access-Key", "<secret>");
        // myHeaders = myHeaders.set("Application-Names", ["Contacts", "ProAngular"]);

        return this.http.request<T>(verb, url, { 
            body: body
            //,
            //headers: myHeaders
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }
    
}
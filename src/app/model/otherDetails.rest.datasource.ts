import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { OtherDetails } from "./otherDetails.model";
import { catchError } from "rxjs/operators";

export const REST_URL_OD = new InjectionToken("rest_url");

@Injectable()
export class OtherDetailsRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_OD) private url: string) {}
    
    getData(): Observable<OtherDetails[]> 
    {
        return this.sendRequest<OtherDetails[]>("GET",this.url);
    }
    saveOtherDetails(otherDetails: OtherDetails) : Observable<OtherDetails> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, otherDetails);
    }
    updateOtherDetails(otherDetails: OtherDetails): Observable<OtherDetails>
    {
        return this.sendRequest<OtherDetails>("PUT", `${this.url}/${otherDetails.otherDetailsId}`, otherDetails);
    }

    deleteOtherDetails(id: number): Observable<OtherDetails>
    {
        return this.sendRequest<OtherDetails>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: OtherDetails) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: OtherDetails[]) : Observable<T>
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
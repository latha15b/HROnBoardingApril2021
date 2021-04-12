import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { OtherProfessionalDetails } from "./otherProfessionalDetails.model";
import { catchError } from "rxjs/operators";
import { RatingLevel } from "./ratingLevel.model";

export const REST_URL_OPD = new InjectionToken("rest_url");

@Injectable()
export class OtherProfessionalDetailsRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_OPD) private url: string) {}
    
    getData(): Observable<OtherProfessionalDetails[]> 
    {
        return this.sendRequest<OtherProfessionalDetails[]>("GET",this.url);
    }
    getAllRatingLevelDetails(): Observable<RatingLevel[]>
    {
        console.log(this.url+"/GetAllRatingLevelDetails/");
        return this.sendRequestRatingLevel<RatingLevel[]>("GET",this.url+"/GetAllRatingLevelDetails/")
    }
    saveOtherProfessionalDetails(otherProfessionalDetails: OtherProfessionalDetails) : Observable<OtherProfessionalDetails> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, otherProfessionalDetails);
    }

    updateOtherProfessionalDetails(otherProfessionalDetails: OtherProfessionalDetails): Observable<OtherProfessionalDetails>
    {
        return this.sendRequest<OtherProfessionalDetails>("PUT", `${this.url}/${otherProfessionalDetails.otherProfessionalDetailsId}`, otherProfessionalDetails);
    }

    deleteOtherProfessionalDetails(id: number): Observable<OtherProfessionalDetails>
    {
        return this.sendRequest<OtherProfessionalDetails>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: OtherProfessionalDetails) : Observable<T>
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
    private sendRequestRatingLevel<T>(verb: string, url: string, body?: RatingLevel) : Observable<T>
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

    private sendRequestCreate<T>(verb: string, url: string, body?: OtherProfessionalDetails[]) : Observable<T>
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
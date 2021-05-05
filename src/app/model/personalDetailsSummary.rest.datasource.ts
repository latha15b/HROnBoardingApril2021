import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { PersonalDetailsSummary } from "./personalDetailsSummary.model";
import { catchError } from "rxjs/operators";

export const REST_URL_SM = new InjectionToken("rest_url");

@Injectable()
export class PersonalDetailsSummaryRestDataSource
{
    constructor(private http: HttpClient,
        @Inject(REST_URL_SM) private url: string) {}
    
    
    getSummaryDataById(employeeId: number): Observable<PersonalDetailsSummary> 
    {
        return this.sendRequest<PersonalDetailsSummary>("GET",`${this.url}/${employeeId}`);
    }
    

    private sendRequest<T>(verb: string, url: string, body?: PersonalDetailsSummary) : Observable<T>
    {
        console.log(verb);
        console.log(url);
        return this.http.request<T>(verb, url, { 
            body: body
        }).pipe(catchError((error: Response) => 
            throwError(`NetworkError: ${error.statusText} (${error.status})`)));
    }
}
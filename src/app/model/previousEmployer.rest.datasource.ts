import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { PreviousEmployer } from "./previousemployer.model";
import { catchError } from "rxjs/operators";

export const REST_URL_PE = new InjectionToken("rest_url");

@Injectable()
export class PreviousEmployerRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_PE) private url: string) {}
    
    getData(): Observable<PreviousEmployer[]> 
    {
        return this.sendRequest<PreviousEmployer[]>("GET",this.url);
    }
    savePreviousEmployer(previousEmployer: PreviousEmployer) : Observable<PreviousEmployer> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, previousEmployer);
    }

    updatePreviousEmployer(previousEmployer: PreviousEmployer): Observable<PreviousEmployer>
    {
        return this.sendRequest<PreviousEmployer>("PUT", `${this.url}/${previousEmployer.personalDetailEmployeeId}`, previousEmployer);
    }
    getPreviousEmployerByEmployeeId(personalDetailEmployeeId: number): Observable<PreviousEmployer[]> 
    {
        return this.sendRequest<PreviousEmployer[]>("GET", `${this.url}/${personalDetailEmployeeId}`);
    }
    deletePreviousEmployer(id: number): Observable<PreviousEmployer>
    {
        return this.sendRequest<PreviousEmployer>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: PreviousEmployer) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: PreviousEmployer[]) : Observable<T>
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
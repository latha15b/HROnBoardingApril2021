import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Kid } from "./kid.model";
import { catchError } from "rxjs/operators";

export const REST_URL_Kid = new InjectionToken("rest_url");

@Injectable()
export class KidRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_Kid) private url: string) {}
    
    getData(): Observable<Kid[]> 
    {
        return this.sendRequest<Kid[]>("GET",this.url);
    }
    getKidByGroupMedicalId(groupMedicalId: number): Observable<Kid[]>
    {
        return this.sendRequest<Kid[]>("GET", `${this.url}/${groupMedicalId}`);
    }
    saveKid(kid: Kid) : Observable<Kid> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, kid);
    }

    updateKid(kid: Kid): Observable<Kid>
    {
        return this.sendRequest<Kid>("PUT", `${this.url}/${kid.groupMedicalCoverGroupMedicalId}`, kid);
    }

    deleteKid(id: number): Observable<Kid>
    {
        return this.sendRequest<Kid>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Kid) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: Kid[]) : Observable<T>
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
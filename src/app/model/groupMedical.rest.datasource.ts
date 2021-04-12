import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GroupMedical } from "./groupMedical.model";
import { catchError } from "rxjs/operators";

export const REST_URL_GM = new InjectionToken("rest_url");

@Injectable()
export class GroupMedicalRestDataSource
{
    constructor(private http: HttpClient,@Inject(REST_URL_GM) private url: string) {}
    
    getData(): Observable<GroupMedical[]> 
    {
        return this.sendRequest<GroupMedical[]>("GET",this.url);
    }
   
    saveGroupMedical(groupMedical: GroupMedical) : Observable<GroupMedical> 
    {   
        console.log(this.url);       
        return this.sendRequest("POST",this.url, groupMedical);
    }

    updateGroupMedical(groupMedical: GroupMedical): Observable<GroupMedical>
    {
        return this.sendRequest<GroupMedical>("PUT", `${this.url}/${groupMedical.groupMedicalId}`, groupMedical);
    }

    deleteGroupMedical(id: number): Observable<GroupMedical>
    {
        return this.sendRequest<GroupMedical>("DELETE", `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: GroupMedical) : Observable<T>
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
    private sendRequestCreate<T>(verb: string, url: string, body?: GroupMedical[]) : Observable<T>
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
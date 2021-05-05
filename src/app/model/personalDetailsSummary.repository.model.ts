import { state } from '@angular/animations';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { PersonalDetailsSummary } from "./personalDetailsSummary.model";
import { PersonalDetailsSummaryRestDataSource } from "./personalDetailsSummary.rest.datasource";


@Injectable()
export class PersonalDetailsSummaryModel
{
    constructor(private dataSource: PersonalDetailsSummaryRestDataSource) 
    {
    }

    getPersonalDetailsSummaryById(employeeId: number):Observable<PersonalDetailsSummary>
    {
        return this.dataSource.getSummaryDataById(employeeId);
    }

}
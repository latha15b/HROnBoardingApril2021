import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { OtherDetails } from "./otherDetails.model";
//import { StaticDataSource } from "./static.datasource";
import { OtherDetailsRestDataSource } from "./otherDetails.rest.datasource";
import { State } from './state.model';

@Injectable()
export class OtherDetailsModel
{
    private otherDetails: OtherDetails[] = new Array<OtherDetails>();
    private locator = (p: OtherDetails, otherDetailsId: number) => p.otherDetailsId == otherDetailsId;

    constructor(private dataSource: OtherDetailsRestDataSource) 
    {
        //this.OtherDetails = new Array<OtherDetails>();
        //this.dataSource.getData().forEach(p => this.OtherDetails.push(p));
        this.dataSource.getData().subscribe(data => this.otherDetails = data);
        
    }

    getOtherDetails(): OtherDetails[]
    {
        return this.otherDetails;
    }

    getOtherDetailsById(otherDetailsId: number): OtherDetails
    {
        return this.otherDetails.find(p => this.locator(p,otherDetailsId));
    }
   
    saveOtherDetails(otherDetails: OtherDetails)
    {
        if(otherDetails.otherDetailsId == 0 || otherDetails.otherDetailsId == null)
        {
             this.dataSource.saveOtherDetails(otherDetails).subscribe(p => this.otherDetails.push(p));
        }
        else
        {
            this.dataSource.updateOtherDetails(otherDetails).subscribe(p => {
                let index = this.otherDetails.findIndex(pd => this.locator(pd, otherDetails.otherDetailsId));
                this.otherDetails.splice(index, 1, otherDetails);
            });
        }
    }

    deleteOtherDetails(otherDetailsId: number)
    {
        let index = this.otherDetails.findIndex(edu => this.locator(edu, otherDetailsId));
        if(index > -1)
        {
            this.otherDetails.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getOtherDetailsById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}

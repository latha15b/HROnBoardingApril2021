import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from 'rxjs';
import { OtherProfessionalDetails } from "./otherProfessionalDetails.model";
//import { StaticDataSource } from "./static.datasource";
import { OtherProfessionalDetailsRestDataSource } from "./otherProfessionalDetails.rest.datasource";
import { RatingLevel } from "./ratingLevel.model";
import { State } from './state.model';

@Injectable()
export class OtherProfessionalDetailsModel
{
    private otherProfessionalDetails: OtherProfessionalDetails[] = new Array<OtherProfessionalDetails>();
    private locator = (p: OtherProfessionalDetails, otherProfessionalDetailsId: number) => p.otherProfessionalDetailsId == otherProfessionalDetailsId;
    private ratingLevels: RatingLevel[] = new Array<RatingLevel>();

    constructor(private dataSource: OtherProfessionalDetailsRestDataSource) 
    {
        //this.OtherProfessionalDetails = new Array<OtherProfessionalDetails>();
        //this.dataSource.getData().forEach(p => this.OtherProfessionalDetails.push(p));
        this.dataSource.getData().subscribe(data => this.otherProfessionalDetails = data);
        
    }

    getOtherProfessionalDetails(): OtherProfessionalDetails[]
    {
        return this.otherProfessionalDetails;
    }

    getAllRatingLevelDetails(): RatingLevel[]
    {
        this.ratingLevels = [];
        this.dataSource.getAllRatingLevelDetails().subscribe(p => this.ratingLevels.push(...p));
        console.log("rar" + this.ratingLevels);
        return this.ratingLevels;

    }
    getOtherProfessionalDetailsById(otherProfessionalDetailsId: number): OtherProfessionalDetails
    {
        return this.otherProfessionalDetails.find(p => this.locator(p,otherProfessionalDetailsId));
    }
    saveOtherProfessionalDetails(otherProfessionalDetails: OtherProfessionalDetails)
    {
        if(otherProfessionalDetails.otherProfessionalDetailsId == 0 || otherProfessionalDetails.otherProfessionalDetailsId == null)
        {
             this.dataSource.saveOtherProfessionalDetails(otherProfessionalDetails).subscribe(p => this.otherProfessionalDetails.push(p));
        }
        else
        {
            this.dataSource.updateOtherProfessionalDetails(otherProfessionalDetails).subscribe(p => {
                let index = this.otherProfessionalDetails.findIndex(pd => this.locator(pd, otherProfessionalDetails.otherProfessionalDetailsId));
                this.otherProfessionalDetails.splice(index, 1, otherProfessionalDetails);
            });
        }
    }

    deleteOtherProfessionalDetails(otherProfessionalDetailsId: number)
    {
        let index = this.otherProfessionalDetails.findIndex(edu => this.locator(edu, otherProfessionalDetailsId));
        if(index > -1)
        {
            this.otherProfessionalDetails.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getOtherProfessionalDetailsById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}

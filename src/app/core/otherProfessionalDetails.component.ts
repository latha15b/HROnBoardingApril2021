import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OtherProfessionalDetails } from "../model/otherProfessionalDetails.model";
import { OtherProfessionalDetailsModel } from "../model/otherProfessionalDetails.repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { Router } from "@angular/router";
import { timestamp } from 'rxjs/operators';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { RatingLevel } from "../model/ratingLevel.model";
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { PersonalDetails } from "../model/personaldetails.model";


@Component({
    selector: "opdForm",
    templateUrl: "otherProfessionalDetails.component.html",
    styleUrls: ["otherProfessionalDetails.component.css"]
})

export class OtherProfessionalDetailsComponent
{
    otherProfessionalDetails: OtherProfessionalDetails = new OtherProfessionalDetails();
    ratingLevels: RatingLevel[] = new Array<RatingLevel>();
    personalEmployeeId: number = -1;
    otherProfessionalDetailsId: number = 0;
    personalDetails: PersonalDetails = new PersonalDetails();
    href: string = "";
    isSummaryPage: boolean = false;


    constructor(private model: OtherProfessionalDetailsModel,private empModel: PersonalDetailsModel,
            @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
            @Inject(SHARED_STATE) public observer: Observer<SharedState>,
            private router: Router)
    {
        this.ratingLevels = model.getAllRatingLevelDetails();
       console.log(this.ratingLevels);
      
    }

    ngOnInit(): void 
    {
        this.href = this.router.url;
        console.log("URL " + this.href);
        if(this.href == "/form/summaryDetails")
        {
            this.isSummaryPage = true;
        }
        else
        {
            this.isSummaryPage = false;
        }
        if(!this.editing)
        {
           // this.gender.push(new Gender(-1, "Please select"));
        //    console.log(this.ratingLevels);
        //     this.ratingLevels = this.model.getAllRatingLevelDetails();

        }   
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = false;
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.empModel.getPersonalDetailsById(this.personalEmployeeId).subscribe(
                p =>{
                    this.personalDetails = p;
                    console.log(this.personalDetails);
                    if(this.personalDetails.otherProfessionalDetailsId)
                    {
                        
                        this.otherProfessionalDetails = this.model.getOtherProfessionalDetailsById(p.otherProfessionalDetailsId);
                        this.editing = true;
                    }
                    else
                    {
                        this.otherProfessionalDetails = new OtherProfessionalDetails();
                    }
                });
        }
        else
        {
            this.editing = false;
            this.personalEmployeeId =-1
            this.router.navigateByUrl("/form/otherDetails");
        }           
    }
  

    editing: boolean = false;

    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            console.log("In");
            this.otherProfessionalDetails.personalDetailEmployeeId = this.personalEmployeeId;
            console.log(this.otherProfessionalDetails);
            this.model.saveOtherProfessionalDetails(this.otherProfessionalDetails);
            this.router.navigateByUrl("/form/uploadDocuments");
        }
    }

    getOtherDetailsOPD()
    {
            this.router.navigateByUrl("/form/otherDetails");
    }
    getToday(): string {
        return new Date().toISOString().split('T')[0]
     }

    resetForm()
    {
        this.otherProfessionalDetails = new OtherProfessionalDetails();
    }
}
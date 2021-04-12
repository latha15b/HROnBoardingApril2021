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
import { UploadDocumentsModel } from "../model/uploadDocuments.repository.model";


@Component({
    selector: "summaryForm",
    templateUrl: "summaryDetails.component.html",
    styleUrls: ["summaryDetails.component.css"]
})

export class SummaryDetailsComponent
{
   
    personalEmployeeId: number = 0;

    constructor(@Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
            @Inject(SHARED_STATE) public observer: Observer<SharedState>,
            private router: Router,private model: UploadDocumentsModel)
    {
        
      
    }

    ngOnInit(): void 
    {
        if(!this.editing)
        {
           
        }   
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = false;
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
        }
                
    }
  

    editing: boolean = false;

    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            window.close();
            sessionStorage.removeItem("PersonalDetailsEmployeeId");
        }
    }
    getOtherDetailsSummary()
    {
            this.router.navigateByUrl("/form/uploadDocuments");
    }
    resetForm()
    {
    }
}
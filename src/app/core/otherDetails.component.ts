import { ThrowStmt } from "@angular/compiler";
import { Component, Inject } from "@angular/core";
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { OtherDetails } from '../model/otherDetails.model';
import { OtherDetailsModel } from '../model/otherDetails.repository.model';
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { SharedState, SHARED_STATE } from './sharedState.model';

@Component({
    selector: "odForm",
    templateUrl: "otherDetails.component.html",
    styleUrls: ["otherDetails.component.css"]
})

export class OtherDetailsComponent
{
    startDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    otherDetails: OtherDetails = new OtherDetails();
    //today = new Date();
    personalEmployeeId: number = -1;
    editing: boolean = false;
    href: string = "";
    isSummaryPage: boolean = false;

    constructor(private model: OtherDetailsModel,private empModel: PersonalDetailsModel ,private router: Router,
        @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
        @Inject(SHARED_STATE) public observer: Observer<SharedState>)
    {
        console.log(stateEvents);
        
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
            console.log("In Editing");
                       
        }     
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            //this.otherDetails = this.model.getOtherDetailsById(9);
            this.empModel.getPersonalDetailsById(this.personalEmployeeId).subscribe(
                p =>{
                    if(p.otherDetailsId) 
                    {
                        console.log(p.otherDetailsId);
                        this.otherDetails = this.model.getOtherDetailsById(p.otherDetailsId);
                        this.editing = true;
                    }
                    else
                    {
                        this.otherDetails = new OtherDetails();
                    }
                });
        }
        else
        {
            this.editing = false;
            this.router.navigateByUrl("/form/createpersonaldetails");
        }     
    }

    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            if(this.editing)
            {
                this.otherDetails.otherDetailsId=this.otherDetails.otherDetailsId;
            }
            else
            {
                this.otherDetails.otherDetailsId = null;
            }
            console.log(this.otherDetails);
            this.otherDetails.permanentAddress = "NA";
            this.otherDetails.state = "NA";
            this.otherDetails.pincode =0;
            this.otherDetails.personalDetailEmployeeId = this.personalEmployeeId;
            this.model.saveOtherDetails(this.otherDetails);
            this.router.navigateByUrl("/form/otherProfessionalDetails");
        }
    }
    
    getYear(date: number)
    {
        return Number(date.toString().split(' ')[3]);
    }

    getToday(): string {
        return new Date().toISOString().split('T')[0]
     }
     
     getPersonalDetailsOT()
     {
             this.router.navigateByUrl("/form/groupMedicalCovers");
     }
    resetForm()
    {
        this.otherDetails = new OtherDetails();
    }
}
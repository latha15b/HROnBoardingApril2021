import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PersonalDetails } from "../model/personaldetails.model";
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { forkJoin, Observable } from "rxjs";
import { Observer } from "rxjs";
import { State } from "../model/state.model";
import { City } from "../model/city.model";
import { Gender } from "../model/gender.model";
import { Bloodgroup } from "../model/bloodgroup.model"; 
import { Router } from "@angular/router";
import { state } from '@angular/animations';
import { NullTemplateVisitor, ThrowStmt } from '@angular/compiler';
import { ThemePalette } from "@angular/material/core";
import { timeout } from "rxjs/operators";
export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
  }

@Component({
    selector: "pdForm",
    templateUrl: "formPersonalDetails.component.html",
    styleUrls: ["formPersonalDetails.component.css"]
})

export class FormPersonalDetailsComponent
{
    personalDetails: PersonalDetails = new PersonalDetails();
    updatePersonaldetails: PersonalDetails = new PersonalDetails();
    states: State[] = new Array<State>();
    cities: City[] = new Array<City>();
    citiesPA: City[] = new Array<City>();
    citiesCurr: City[] = new Array<City>();
    citiesPA1: City[] = new Array<City>();
    gender: Gender[] = new Array<Gender>();
    bloodGroup: Bloodgroup[] = new Array<Bloodgroup>();
    personalEmployeeId: number = 1;
    editing: boolean = false;
    href: string = "";
    isSummaryPage: boolean = false;
    sameAsCurrentAddress: boolean = false;

    cityCurrentStateId: string = "";
    cityPermanentStateId: string = "";

    task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
          {name: 'Primary', completed: false, color: 'primary'},
          {name: 'Accent', completed: false, color: 'accent'},
          {name: 'Warn', completed: false, color: 'warn'}
        ]
      };

    constructor(private model: PersonalDetailsModel,
            @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
            @Inject(SHARED_STATE) public observer: Observer<SharedState>,
            private router: Router)
    {
        // this.states = new Array<State>();
        // this.states = this.model.getStateDetails();

        // this should be created in the Login Component
        stateEvents.subscribe(ss => { 
            console.log("SS" + ss);
           if(ss.employeeId != undefined)
           {
            {
                Object.assign(this.personalDetails, this.model.getPersonalDetailsById(ss.employeeId));
            }
            this.editing = ss.mode == MODES.EDIT;
           }
           else
           {
            this.editing = ss.mode == MODES.CREATE;
           }
       })
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
            this.states = new Array<State>();
            this.states = this.model.getStateDetails();

            this.gender.push(new Gender(1, "Male"));
            this.gender.push(new Gender(2, "Female"));
            this.gender.push(new Gender(3,"Transgender"));

            this.bloodGroup.push(new Bloodgroup(1, "A +"));
            this.bloodGroup.push(new Bloodgroup(2, "A -"));
            this.bloodGroup.push(new Bloodgroup(3, "B +"));
            this.bloodGroup.push(new Bloodgroup(4, "B -"));
            this.bloodGroup.push(new Bloodgroup(5, "O +"));
            this.bloodGroup.push(new Bloodgroup(6, "O -"));
            this.bloodGroup.push(new Bloodgroup(7, "AB +"));
            this.bloodGroup.push(new Bloodgroup(8, "AB -"));
        }          
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = true;

            console.log("sessionper1" + sessionStorage.getItem("PersonalDetailsEmployeeId") );
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.model.getPersonalDetailsById(this.personalEmployeeId).subscribe(
                p =>{ this.personalDetails = p;
                    this.personalDetails.pincode=this.personalDetails.pincode
                    this.cityCurrentStateId = this.personalDetails.currentStateId;
                    this.cityPermanentStateId = this.personalDetails.permanentAddressStateId;
                    this.getCitiesForMultipleStateId().subscribe(([responseCurrentStateId, responsePermanentStateId]) => {
                     this.citiesCurr = responseCurrentStateId;
                     this.citiesPA = responsePermanentStateId;
                  })
                });
        }
        else
        {
            this.router.navigateByUrl("/form/createpersonaldetails");
        }
        console.log("Save" + this.editing);
    }

    public getCitiesForMultipleStateId(): Observable<any[]>
    {
        let serviceCurrentStateId=this.model.getCityDetails(Number(this.cityCurrentStateId))
        let servicePermanentStateId=this.model.getCityDetails(Number(this.cityPermanentStateId));
        var cityResults = forkJoin([serviceCurrentStateId, servicePermanentStateId]);
        return  cityResults;
    }
   
    changePermanentAddressState(state: string)
    {
        this.citiesPA = [];
        this.citiesPA = this.cities;
        this.citiesPA = this.model.getCityDetailByStateId(Number(state));
    }
    changeCurrentState(stateCurrent: string)
    {
        this.citiesCurr = [];
        this.citiesCurr = this.model.getCityDetailByStateId(Number(stateCurrent));
    }
    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            if(this.editing)
           {
                this.personalDetails.stateId = this.personalDetails.currentStateId;
                this.personalDetails.cityId = this.personalDetails.currentCityId;
                this.model.updatePersonalDetails(this.personalDetails);
                //sessionStorage.setItem("PersonalDetailsEmployeeId",this.personalEmployeeId)
                this.router.navigateByUrl("/form/educationdetails");
               
           } 
           else
           {
                console.log("In");
                console.log(this.personalDetails);
                this.personalDetails.stateId = this.personalDetails.currentStateId;
                this.personalDetails.cityId = this.personalDetails.currentCityId;
                this.personalDetails.groupMedicalCoverGroupMedicalId = null;
                this.personalDetails.otherDetailsId = null;
                this.personalDetails.otherProfessionalDetailsId = null;
                this.model.savePersonalDetails(this.personalDetails).subscribe(p => 
                    {
                        this.personalDetails = p
                        this.router.navigateByUrl("/form/educationdetails");
                        sessionStorage.setItem("PersonalDetailsEmployeeId",p.employeeId.toString());

                    });
            }
    }
    }

    showOptions(event): void {
        console.log(event.checked);
        if(event.checked)
        {
            this.citiesPA = [];
            this.changePermanentAddressState(this.personalDetails.currentStateId);
            this.personalDetails.permanentAddress= this.personalDetails.currentAddress;
            this.personalDetails.permanentAddressStateId= this.personalDetails.currentStateId;
            this.personalDetails.permanentAddressCityId= this.personalDetails.currentCityId;
            this.personalDetails.permanentAddressPincode= this.personalDetails.pincode;

        }
        else
        {
            this.personalDetails.permanentAddress= "";
            this.personalDetails.permanentAddressStateId= "";
            this.personalDetails.permanentAddressCityId= "";
            this.personalDetails.permanentAddressPincode= null;
 
        }
    }
    getToday(): string {
        return new Date().toISOString().split('T')[0]
     }

    resetForm()
    {
        sessionStorage.clear();
        this.router.navigateByUrl("/form/createpersonaldetails");
    }
}
import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PersonalDetails } from "../model/personaldetails.model";
import { PersonalDetailsModel } from "../model/personalDetails.repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { State } from "../model/state.model";
import { City } from "../model/city.model";
import { Gender } from "../model/gender.model";
import { Bloodgroup } from "../model/bloodgroup.model"; 
import { Router } from "@angular/router";
import { state } from '@angular/animations';
import { NullTemplateVisitor, ThrowStmt } from '@angular/compiler';
import { ThemePalette } from "@angular/material/core";
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
    gender: Gender[] = new Array<Gender>();
    bloodGroup: Bloodgroup[] = new Array<Bloodgroup>();
    personalEmployeeId: number =10;
    editing: boolean = false;
    href: string = "";
    isSummaryPage: boolean = false;
    sameAsCurrentAddress: boolean = false;

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
        // this.observer.next(new SharedState(MODES.CREATE));

        // stateEvents.subscribe((update) => {
        //     this.personalDetails = new PersonalDetails();
        //     if(update.employeeId != undefined)
        //     {
        //         Object.assign(this.personalDetails, this.model.getPersonalDetailsById(update.employeeId));
        //     }
        //     this.editing = update.mode == MODES.EDIT;
        // });
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
            this.states = new Array<State>();
            this.states = this.model.getStateDetails();
            //this.states.push(new State(-1, "Please select"));
            //this.personalDetails.stateId = -1;
            //this.cities.push(new City(-1, "Please select"));
            //this.personalDetails.cityId = -1;

            
           // this.gender.push(new Gender(-1, "Please select"));
            this.gender.push(new Gender(1, "Male"));
            this.gender.push(new Gender(2, "Female"));
            this.gender.push(new Gender(3,"Transgender"));

            //this.personalDetails.gender = "Please select";

            //this.bloodGroup.push(new Bloodgroup(-1, "Please select"));
            this.bloodGroup.push(new Bloodgroup(1, "A +"));
            this.bloodGroup.push(new Bloodgroup(2, "A -"));
            this.bloodGroup.push(new Bloodgroup(3, "B +"));
            this.bloodGroup.push(new Bloodgroup(4, "B -"));
            this.bloodGroup.push(new Bloodgroup(5, "O +"));
            this.bloodGroup.push(new Bloodgroup(6, "O -"));
            this.bloodGroup.push(new Bloodgroup(7, "AB +"));
            this.bloodGroup.push(new Bloodgroup(8, "AB -"));

            //this.personalDetails.bloodGroup = "Please select"
        }          
        if(sessionStorage.getItem("PersonalDetailsEmployeeId"))
        {
            this.editing = true;

            console.log("sessionper1" + sessionStorage.getItem("PersonalDetailsEmployeeId") );
            this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
            this.model.getPersonalDetailsById(this.personalEmployeeId).subscribe(
                p =>{ this.personalDetails = p;
                    this.changeState(this.personalDetails.stateId),
                    this.changePermanentAddressState(this.personalDetails.permanentAddressStateId),
                    this.personalDetails.pincode=this.personalDetails.pincode;
                    this.personalDetails.stateId=this.personalDetails.stateId;

                });
        }
        else
        {
            this.router.navigateByUrl("/form/createpersonaldetails");
        }
        console.log("Save" + this.editing);
    }
    changeState(state: string)
    {
        console.log("Cities");
        console.log(state);
        
        this.cities = [];
        
        this.cities = this.model.getCityDetails(Number(state));
        //this.cities.push(new City(-1, 'Please select'));
        //this.personalDetails.cityId = -1;
    }
    changePermanentAddressState(state: string)
    {
        console.log("Cities");
        console.log(state);
        
        this.citiesPA = [];
        
        this.citiesPA = this.model.getCityDetails(Number(state));
        //this.cities.push(new City(-1, 'Please select'));
        //this.personalDetails.cityId = -1;
    }
    changeCity(cityId: number)
    {
        //this.cities.push(new City(-1, 'Please select'));
        //this.personalDetails.cityId = -1;
    }


    submitForm(form: NgForm)
    {
        if(form.valid)
        {
            if(this.editing)
           {
                //this.updatePersonaldetails = new PersonalDetails();
                
                // this.updatePersonaldetails.employeeId =this.personalEmployeeId;
                // this.updatePersonaldetails.title = this.personalDetails.title;
                // this.updatePersonaldetails.firstName = this.personalDetails.firstName;
                // this.updatePersonaldetails.lastName = this.personalDetails.lastName;
                // this.updatePersonaldetails.dateOfBirth = this.personalDetails.dateOfBirth;
                // this.updatePersonaldetails.cellNumber = this.personalDetails.cellNumber;
                // this.updatePersonaldetails.currentAddress = this.personalDetails.currentAddress;
                // this.updatePersonaldetails.cityId = this.personalDetails.cityId;
                // this.updatePersonaldetails.pincode = this.personalDetails.pincode;
                // this.updatePersonaldetails.stateId = this.personalDetails.stateId;
                // this.updatePersonaldetails.gender = this.personalDetails.gender;
                // this.updatePersonaldetails.bloodGroup = this.personalDetails.bloodGroup;
                // this.updatePersonaldetails.emergencyContactNumber = this.personalDetails.emergencyContactNumber;
                // this.updatePersonaldetails.personalEmailId = this.personalDetails.personalEmailId;
                // this.updatePersonaldetails.isDeclarationStatus = this.personalDetails.isDeclarationStatus;
                // this.updatePersonaldetails.totalYearsOfExperience = this.personalDetails.totalYearsOfExperience;
                console.log("update");
                console.log(this.personalDetails);

                this.model.updatePersonalDetails(this.personalDetails);
                //sessionStorage.setItem("PersonalDetailsEmployeeId",this.personalEmployeeId)
                this.router.navigateByUrl("/form/educationdetails");
               
           } 
           else
           {
                console.log("In");
                console.log(this.personalDetails);
                this.personalDetails.groupMedicalCoverGroupMedicalId = null;
                this.personalDetails.otherDetailsId = null;
                this.personalDetails.otherProfessionalDetailsId = null;
                this.model.savePersonalDetails(this.personalDetails).subscribe(p => 
                    {
                        this.personalDetails = p
                        this.router.navigateByUrl("/form/educationdetails");
                        sessionStorage.setItem("PersonalDetailsEmployeeId",p.employeeId)

                    });
            //sessionStorage.setItem("PersonalDetailsEmployeeId",this.personalDetails.employeeId.toString());
           // this.observer.next(new SharedState(MODES.EDIT,this.personalDetails.employeeId));
            }
    }
    }

    showOptions(event): void {
        console.log(event.checked);
        if(event.checked)
        {
            this.citiesPA = [];
            this.citiesPA = this.cities;
            this.personalDetails.permanentAddress= this.personalDetails.currentAddress;
            this.personalDetails.permanentAddressStateId= this.personalDetails.stateId;
            this.personalDetails.permanentAddressCityId= this.personalDetails.cityId;
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
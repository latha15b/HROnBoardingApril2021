import { state } from '@angular/animations';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { City } from './city.model';
import { PersonalDetails } from "./personaldetails.model";
//import { StaticDataSource } from "./static.datasource";
import { PersonalDetailsRestDataSource } from "./personalDetails.rest.datasource";
import { State } from './state.model';

@Injectable()
export class PersonalDetailsModel
{
    private personaldetails: PersonalDetails[] = new Array<PersonalDetails>();
    private states: State[] = new Array<State>();
    private cities: City[] = new Array<City>();
    private locator = (p: PersonalDetails, employeeId: number) => p.employeeId == employeeId;

    constructor(private dataSource: PersonalDetailsRestDataSource) 
    {
        //this.personaldetails = new Array<PersonalDetails>();
        //this.dataSource.getData().forEach(p => this.personaldetails.push(p));
        this.dataSource.getData().subscribe(data => this.personaldetails = data);
        
    }

    getPersonalDetails(): PersonalDetails[]
    {
        return this.personaldetails;
    }

    getPersonalDetailsById(employeeId: number):Observable<PersonalDetails>
    {
        return this.dataSource.getDataById(employeeId);
    }

    getStateDetails(): State[]
    {
        this.states = [];
        this.dataSource.getState().subscribe(p => this.states.push(...p));
        return this.states;
    }

    getCityDetails(stateId: number): City[]
    {
        this.cities = [];
        this.dataSource.getCities(stateId).subscribe(p => this.cities.push(...p));
        return this.cities;
    }
    getCitiesByStateName(stateName: string): City[]
    {
        this.cities = [];
        this.dataSource.getCitiesByStateName(stateName).subscribe(p => this.cities.push(...p));
        return this.cities;
    }


    savePersonalDetails(personaldetails: PersonalDetails): Observable<any>
    {
        if(personaldetails.employeeId == 0 || personaldetails.employeeId == null)
        {
            return this.dataSource.savePersonalDetails(personaldetails);
        }
        else
        {
            return this.dataSource.updatePersonalDetails(personaldetails);
        //    this.dataSource.updatePersonalDetails(personaldetails).subscribe(p => {
        //         let index = this.personaldetails.findIndex(pd => this.locator(pd, personaldetails.employeeId));
        //         this.personaldetails.splice(index, 1, personaldetails);
        //     });
        }
    }
    
    updatePersonalDetails(personaldetails: PersonalDetails)
    {
       console.log("repo");
       console.log(personaldetails);
            //return this.dataSource.updatePersonalDetails(personaldetails);
           //this.dataSource.updatePersonalDetails((personaldetails)
           
           this.dataSource.updatePersonalDetails(personaldetails).subscribe(p => {
                    let index = this.personaldetails.findIndex(pd => this.locator(pd, personaldetails.employeeId));
                    this.personaldetails.splice(index, 1, personaldetails);
                });
    }
    

    deletePersonalDetails(employeeId: number)
    {
        let index = this.personaldetails.findIndex(p => this.locator(p, employeeId));
        if(index > -1)
        {
            this.personaldetails.splice(index, 1);
        }
    }

    private generateID(): number
    {
        let candidate = 100;
        while(this.getPersonalDetailsById(candidate) != null)
        {
            candidate++;
        }
        return candidate;
    }

}

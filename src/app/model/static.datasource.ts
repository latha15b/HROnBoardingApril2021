import { Injectable } from "@angular/core";
import { PersonalDetails } from "./personaldetails.model";

@Injectable()
export class StaticDataSource
{
    private data: PersonalDetails[];

    constructor() 
    {
        // this.data = new Array<PersonalDetails>(
        //     new PersonalDetails(1, "Mr", "Sajith", "Sasidharan", new Date("1982-06-25"),
        //     "7406313222","Flat No-604, Ittina Soupernika Apartment, Sarjapur Road, Bangalore-560035"
        //     ,1,560035,1,"Male","A +","9739385588",
        //     "Sajith.Sasidharan@cai.io",false,15),
        //     new PersonalDetails(2, "Mr", "Surappa", "Salama", new Date("1992-07-29"),
        //     "7406413222","Flat No-122, Ittina Soupernika Apartment, Sarjapur Road, Bangalore-560035"
        //     ,1,560035,1,"Male","A +","9739385589",
        //     "Surappa.Salama@cai.io",false,10),
        //     new PersonalDetails(3, "Mr", "Daniel", "Mayana", new Date("1932-06-25"),
        //     "7406513222","Flat No-604, Ittina Soupernika Apartment, Sarjapur Road, Bangalore-560035"
        //     ,1,560035,1,"Male","A +","9739385590",
        //     "Daniel.Mayana@cai.io",false,11),
        //     new PersonalDetails(4, "Mrs", "Salala", "Munapa", new Date("1994-09-11"),
        //     "7407313222","Flat No-604, Ittina Soupernika Apartment, Sarjapur Road, Bangalore-560035"
        //     ,1,560035,1,"Male","A +","9739385591",
        //     "Salala.Munapa@cai.io",false,12),
        //     new PersonalDetails(5, "Mr", "Rajan", "Ram", new Date("1996-12-09"),
        //     "7409313222","Flat No-604, Ittina Soupernika Apartment, Sarjapur Road, Bangalore-560035"
        //     ,1,560035,1,"Male","A +","9739385592",
        //     "Rajan.Ram@cai.io",false,15)
        // );
    }

    getData(): PersonalDetails[]
    {
        return this.data;
    }
    
}
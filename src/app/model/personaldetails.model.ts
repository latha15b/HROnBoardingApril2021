import { State } from "./state.model";

export class PersonalDetails
{
    constructor(
        public employeeId?: number,
        public title?: string,
        public firstName?: string,
        public lastName?: string,
        public dateOfBirth?: Date,
        public cellNumber?: string,
        public currentAddress?: string,
        public cityId?: string,
        public pincode?: number,
        public stateId?: string,
        public currentCityId?: string,
        public currentStateId?:string,
        public permanentAddress?: string,
        public permanentAddressCityId?: string,
        public permanentAddressPincode?: number,
        public permanentAddressStateId?: string,
        public gender?: string,
        public bloodGroup?: string,
        public emergencyContactNumber?: string,
        public personalEmailId?: string,
        public isDeclarationStatus?: boolean,
        public totalYearsOfExperience?: number,
        public groupMedicalCoverGroupMedicalId?:number,
        public otherDetailsId?:number,
        public otherProfessionalDetailsId?:number,
        //public state?: string,
        //public city?: string,

        ) {}
}
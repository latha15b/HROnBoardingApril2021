import { State } from "./state.model";

export class OtherDetails
{
    constructor(
        public otherDetailsId?: number,
        public panNumber?: string,
        public nameAsOnPANCard?: string,
        public aadhaarNumber?: string,
        public nameAsOnAadhaar?: string,
        public passportNumber?: string,
        public nameAsOnPassport?: string,
        public nationality?: string,
        public placeOfIssue?: string,
        public validFrom?: Date,
        public validTo?: Date,
        public bankName?: string,
        public accountNumber?: string,
        public ifscCode?: string,
        public nameAsInBankAccount?: string,
        public branch?: string,
        public permanentAddress?: string,
        public pincode?: number,
        public state?: string,
        public personalDetailEmployeeId?: number,
        ) {}
}
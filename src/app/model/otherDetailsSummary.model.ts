export class OtherDetailsSummary
{
    constructor(
        public panNumber?: string,
        public nameAsOnPANCard?: string,
        public aadhaarNumber?: string,
        public nameAsOnAadhaar?: string,
        public passportNumber?: string,
        public nameAsOnPassport?: string,
        public nationality?: string,
        public placeOfIssue?: string,
        public validFrom?: string,
        public validTo?: string,
        public bankName?: string,
        public accountNumber?: string,
        public ifscCode?: string,
        public nameAsInBankAccount?: string,
        public branch?: string,
        public permanentAddress?: string,
        public pincode?: number,
        public state?: string,
    ) {}
}
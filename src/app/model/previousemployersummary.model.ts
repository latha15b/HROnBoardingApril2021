export class PreviousEmployerSummary
{
    constructor(
        public previousEmployerName?: string,
        public dateOfJoining?: string,
        public lastWorkingDay?: string,
        public reasonForLeaving?: string,
        public areTheExitFormalitiesCompleted?: boolean,
        public universalAccountNo?: number,
        public providentFundNo?: number,
        public typeOfPFAccount?: string,
        public isLatestLastEmployer?: boolean,
        public hrName?:string,
        public hrContactNumber?: number,
        public hrEmailID?: string
        ) {}
}
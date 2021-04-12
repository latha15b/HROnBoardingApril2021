
export class PreviousEmployer
{
    constructor(
        public previousEmployerId?: number,
        public previousEmployerName?: string,
        public dateOfJoining?: Date,
        public lastWorkingDay?: Date,
        public reasonForLeaving?: string,
        public areTheExitFormalitiesComplete?: string,
        public areTheExitFormalitiesCompleted?: boolean,
        public universalAccountNo?: number,
        public providentFundNo?: number,
        public typeOfPFAccount?: string,
        public isLatestLastEmployer?: boolean,
        public personalDetailEmployeeId?:number,
        public hrName?:string,
        public hrContactNumber?: number,
        public hrEmailID?: string
        ) {}
}

export class OtpGenerator
{
    constructor(
        public  OtpId?: number,
        public  CellNumber?: string,
        public  OtpCode?: string,
        public  TimeoutTime?: Date,
        public  EmailId?: string
        ) {}
}
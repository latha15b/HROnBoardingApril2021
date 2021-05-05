import { KidSummary} from "./kidsummary.model";

export class GroupMedicalSummary
{
    constructor(
        public dateOfJoining?: string,
        public parentOrInLawsName1?: string,
        public parentOrInLawsName2?: string,
        public parentOrInLawsName1Relationship?: string,
        public parentOrInLawsName2Relationship?: string,
        public married?: boolean,
        public dateOfMarriage?: string,
        public spouseName?: string,
        public spouseDateOfBirth?: string,
        public spouseGender?: string,
        public doYouHaveKids?: boolean,
        public kids: KidSummary[] = []
    ) {}
}
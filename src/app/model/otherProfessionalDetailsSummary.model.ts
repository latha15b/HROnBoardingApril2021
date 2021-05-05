export class OtherProfessionalDetailsSummary
{
    constructor(
        public primarySkills?: string,
        public primarySkillsLevel?: string,
        public secondarySkills?: string,
        public secondarySkillLevel?: string,
        public verbalCommunicationLevel?: number,
        public writtenCommunicationLevel?: number,
        public presentationSkillsLevel?: number,
        public customerInterfactingLevel?: number,
    ) {}
}
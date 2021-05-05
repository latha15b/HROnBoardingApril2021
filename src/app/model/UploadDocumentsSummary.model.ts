export class UploadDocumentsSummary
{
    constructor(
        public fileName?: string,
        public modifiedDate?: Date,
        public documentType?: string,
    ) {}
}

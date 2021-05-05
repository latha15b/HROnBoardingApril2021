import { Component } from "@angular/core";
import { PersonalDetailsSummary } from "../model/personalDetailsSummary.model";
import { PersonalDetailsSummaryModel } from "../model/personalDetailsSummary.repository.model";
import { Observable } from "rxjs";
import { Observer } from "rxjs";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import { PreviousEmployerSummary } from "../model/previousemployersummary.model";
import { OtherDetailsSummary } from "../model/otherDetailsSummary.model";
import { OtherProfessionalDetailsSummary } from "../model/otherProfessionalDetailsSummary.model";
import { KidSummary  } from "../model/kidsummary.model";
import { NgForm } from "@angular/forms";

@Component({
    selector: "summaryPersonalDetails",
    templateUrl: "summaryPersonalDetails.component.html",
    styleUrls: ["summaryPersonalDetails.component.css"]
})

export class SummaryPersonalDetailsComponent
{
    personalDetailsSummary: PersonalDetailsSummary = new PersonalDetailsSummary();
    href: string = "";
    personalEmployeeId: number = 0;
    
    constructor(private model: PersonalDetailsSummaryModel,
                private router: Router)
    {
    }
    
    ngOnInit(): void 
    {
        this.href = this.router.url;
        console.log("URL " + this.href);
        this.personalEmployeeId = Number(sessionStorage.getItem("PersonalDetailsEmployeeId"));
        if(this.href == "/form/summaryPersonalDetails")
        {
            this.model.getPersonalDetailsSummaryById(this.personalEmployeeId).subscribe(
                data => { this.personalDetailsSummary = data
            });
        }
    }

    exportHTML() {
        console.log("Test");
        var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
             "xmlns:w='urn:schemas-microsoft-com:office:word' "+
             "xmlns='http://www.w3.org/TR/REC-html40'>"+
             "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header+document.getElementById("summaryHtml").innerHTML+footer;
        
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'Summary.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
     }

     submitForm()
     {
         console.log("SummaryDetails")
        if(confirm("Are you sure to Submit")) {
            this.router.navigateByUrl("/form/summaryDetails");
          }
     }
    
     getOtherDetailsSummary()
     {
             this.router.navigateByUrl("/form/uploadDocuments");
     }
}
import { Component } from "@angular/core";
import { OtpGenerator } from "../model/otpgenerator.model"
import { OtpGeneratorsModel } from "../model/otpgenerator.repository.model";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent {

  title = 'OnBoarding';
  otp: number;
  emailId:string;
  cellNumber: string ="9916208213";
  isValidPasscode: Boolean = true;
  isValidUser: Boolean= true;
  isValidEmail:Boolean=false;
  otpGenerator: OtpGenerator = new OtpGenerator();

  myImage1: string = "/assets/office-workplace-with-keypad-glasses.jpg";
  constructor(private model: OtpGeneratorsModel, private router: Router) {

  }
  loginForm() {
    console.log(this.otp);
    if (this.otp != 0) {
      this.model.getOtpGeneratorsByOtpCode(this.otp)
        .subscribe(res => {
          if(res){
            console.log(res);
            this.isValidPasscode = res;
            this.isTimeOutValid();
          }
          else
          {
            this.isValidPasscode = res;
          }
         // 
        },
          error => {

          });
    }
  }
  isTimeOutValid() {
    if (this.otp != 0) {
      this.model.getOtpGeneratorsByTimeoutTime(this.otp)
        .subscribe(res => {
          if(res){
            console.log("time"+ res);
            this.isTimeOutValid();
            this.isValidUser = res;
            this.router.navigateByUrl('/form/createpersonaldetails');
          }
          else
          {
            this.isValidUser = res;
          }
         // 
        },
          error => {

          });
    }
  }
  generatePassCode()
  {
    if(this.emailId!=null)
    {
      this.isValidEmail=false;
      let code =(Math.floor(100000 + Math.random() * 900000));
     // this.otpGenerator.OtpId=otpGeneratoragr.OtpId;
      this.otpGenerator.CellNumber=this.cellNumber;
      this.otpGenerator.EmailId=this.emailId;
      this.otpGenerator.OtpCode= code.toString();
      this.otpGenerator.TimeoutTime=new Date();
      this.model.saveOtpGenerators(this.otpGenerator);
      this.isValidUser=true;
      this.router.navigateByUrl("");
    }
    else
    {
      this.isValidEmail=true;
    }
  }
    isValidEmailId() {
      console.log(this.emailId);
      if (this.emailId != null) {
        this.model.getDataByEmailId(this.emailId)
          .subscribe(res => {
            if(res != null){
              
              this.generatePassCode();
            }
            else
            {
              
            }
           // 
          },
            error => {
  
            });
      }
    }
  }

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newPet = {
    name:"",
    type:"",
    description:"",
    skillone:"",
    skilltwo:"",
    skillthree:""
  }
  error;
  id;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }

  addSubmit(){
    this._httpService.addPet(this.newPet, (resFromService) => {
      // console.log("add task submitted", resFromService.error.message);
      if(resFromService.message == "Error") {
        this.error = resFromService.error.message;
      }
      else {
        this.newPet = {
          name:"",
          type:"",
          description:"",
          skillone:"",
          skilltwo:"",
          skillthree:""
        }
        this._router.navigate(["/"]);
      }
    }); 

  }
}

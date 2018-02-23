import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editPet = {
    name:"",
    type:"",
    description:"",
    skillone:"",
    skilltwo:"",
    skillthree:""
  }
  error;
  id:String;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      // this.editPet.name = params.get("id");
      this.id = params.get("id");      
    })
    this._httpService.getPetById(this.id, (res) => {
      this.editPet.name = res.name;
      this.editPet.type = res.type;
      this.editPet.description = res.description;
      this.editPet.skillone = res.skillone;
      this.editPet.skilltwo = res.skilltwo;
      this.editPet.skillthree = res.skillthree;
    })
  }

  editSubmit(){
    this._route.paramMap.subscribe(params => {
      
      this._httpService.editPet(params.get("id"), this.editPet, (resFromService) => {
        console.log(resFromService);
        if (resFromService.message == "Error") {
          this.error = resFromService.error.message;
        }
        // (resFromService.name == "ValidationError") {
        //   this.error = resFromService.message;
        // }
        else{
          this._router.navigate(["/details", this.id]);
        }
        
      }); 
    })
  }

}

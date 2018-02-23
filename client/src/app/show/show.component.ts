import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  thePet = {
    id:"",
    name:"",
    type:"",
    description:"",
    skillone:"",
    skilltwo:"",
    skillthree:""
  }
  id:String;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      // console.log("id here: ", params.get("id"));
      this.id= params.get("id");
    })

    this._httpService.getPetById(this.id, (res) => {
      this.thePet = res;
      console.log(this.thePet);
      // console.log("bbbb", this.authors.name)  
    })
  }

  deleteButtonClicked(deleteId){
    // console.log("deleted ID: ", deleteId);
    this._httpService.deleteThePet(deleteId, (res) => {
      console.log("delete Task Button Clicked");
      this._router.navigate(["/"]);
    })
  }

  vote(quoteIndex){
    this._httpService.voteUp(this.id, (res) => {
      this._httpService.getPetById(this.id, (res) => {
        this.thePet = res;
        console.log(this.thePet);
      })
    })
}



}

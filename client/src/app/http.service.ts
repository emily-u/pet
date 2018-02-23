import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){}

    addPet(newPet, callback){
        console.log("7777", newPet);
        this._http.post("/addpets", newPet).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    getPets(callback) {
        
         this._http.get("/pets").subscribe(
           (res) => {
             callback(res);
           })
         }

    getPetById(petId, callback){
        this._http.get("pet/" + petId).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    deleteThePet(deleteId, callback){
        this._http.delete('/pets/' + deleteId, {}).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

    voteUp(id, callback){
        this._http.put('/vote/' + id, id).subscribe((resFromServer) => {
            callback(resFromServer);
          })

    }

    editPet(editId, edit_content, callback){
        console.log(editId);
        this._http.put('/pets/' + editId, edit_content).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

}

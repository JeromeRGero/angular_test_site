import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllPets(){
      console.log("in getAllPets")
      return this._http.get('/pets/all');
  }

  addServicePet(addform_info){
    console.log("In addServicePet, Form_info is: ", addform_info);
    return this._http.post('/pets/makenew', addform_info);
  }

  getOnePet(thierID){
      console.log("In getOnePet");
      let routePath = '/pets/info/' + thierID;
      return this._http.get(routePath);
  }

  httpDeletePet(AuthorsID){
      console.log("we are going to delete this author", AuthorsID);
      let routePath = '/pets/' + AuthorsID
      return this._http.delete(routePath);
  }

  editServicePet(param1, param2){
      console.log("in editServicePet()\n################", param1, param2);
      return this._http.put("/pets/update/" + param1, param2 )
  }

  httpLikePet(petid){
      console.log("in httpLikePet with", petid)
      let routePath = "/pets/like/" + petid;
      console.log(routePath)
      let dummy = {}
      dummy["useless"] = "This information is meaningless!"
      return this._http.put(routePath, dummy);
  }

}

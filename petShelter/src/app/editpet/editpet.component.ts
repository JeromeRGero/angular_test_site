import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.component.html',
  styleUrls: ['./editpet.component.css']
})
export class EditpetComponent implements OnInit {
    petsId: any;
    petJSONinfo: any;
    editPet: any;
    form_info: any;

  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
    ) { }

  ngOnInit() {
      this.petJSONinfo = {
          "name": "Wait",
          "type": "This",
          "desc": "is",
          "skillA": "still",
          "skillB": "Loading",
          "skillC": "...",
      }
      this._route.params.subscribe((params: Params) => {
          console.log(params['id']);
          this.petsId = params['id'];
          this.loadPage();
      });

  }

  loadPage(){
      let petinfoObservable = this._httpService.getOnePet(this.petsId);
      petinfoObservable.subscribe(data =>{
          console.log("Firing on all cylinders!", data);
          this.petJSONinfo = data;
          this.editPet = data
      })
  }

  editThePet(editedAuthorparam){
      console.log(editedAuthorparam);
      let ePObservable = this._httpService.editServicePet(editedAuthorparam, this.editPet);
      ePObservable.subscribe(data => {
          console.log(editedAuthorparam, this.editPet);
          // this._router.navigate(['/pets']);
      });

  }

}

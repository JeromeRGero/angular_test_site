import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newpet',
  templateUrl: './newpet.component.html',
  styleUrls: ['./newpet.component.css']
})
export class NewpetComponent implements OnInit {
    form_info: any;
    error: any;

  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.form_info = {
          "name": "",
          "type": "",
          "desc": "",
          "skillA": "",
          "skillB": "",
          "skillC": ""
      }
      this.error = {
          "message": ""
      }
  }

  addPet(){
      let authorObservable = this._httpService.addServicePet(this.form_info);
      authorObservable.subscribe(data => {
          this.form_info = {"name": "", "type": "", "desc": "", "skillA": "", "skillB": "", "skillC": "",}
          // { message: "Error", error: err }
         if(data['message'] == "Error"){
            console.log("The Error Message is: ", data['message']);
            this.error = data;
            // this._router.navigate(['/favorite']);
         }
         this._router.navigate(['/pets']);
      });
  }

}

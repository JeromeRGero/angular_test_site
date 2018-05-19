import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
    pets: any;

  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.getPetsTable()
  }

  getPetsTable(){
    let allPetsObservable = this._httpService.getAllPets();
    allPetsObservable.subscribe(data => {
        console.log("I wanna dish out\n############\n", data);
        // console.log(`\n######\n${data[0].name}\n######\n`)
        this.pets = data;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-petinfo',
  templateUrl: './petinfo.component.html',
  styleUrls: ['./petinfo.component.css']
})

export class PetinfoComponent implements OnInit {
    petsId: any;
    petJSONinfo: any;
    likeCheck: any

  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this._route.params.subscribe((params: Params) => {
          console.log(params['id']);
          this.petsId = params['id'];
      });
      this.likeCheck = true;
      this.loadPage();
  }

  loadPage(){
      let petinfoObservable = this._httpService.getOnePet(this.petsId);
      petinfoObservable.subscribe(data =>{
          console.log("Firing on all cylinders!", data);
          this.petJSONinfo = data;
      })
  }

  likePet(thepetId){
      console.log(thepetId)
      this._httpService.httpLikePet(thepetId);
      this.loadPage()
      this.likeCheck = false;
  }

  deletePet(AuthorID){
      console.log("We b Delet'n", AuthorID);
      let theresult = this._httpService.httpDeletePet(AuthorID);
      theresult.subscribe(data => {
          console.log(data);
      });
      this._router.navigate(['/pets']);
  }

}

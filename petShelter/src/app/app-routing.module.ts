import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component'
import { PetinfoComponent } from './petinfo/petinfo.component'
import { NewpetComponent } from './newpet/newpet.component'
import { EditpetComponent } from './editpet/editpet.component'

const routes: Routes = [
    { path: 'pets', component: PetsComponent },
    { path: 'pets/:id', component: PetinfoComponent },
    { path: 'petsnew', component: NewpetComponent },
    { path: 'pets/update/:id', component: EditpetComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

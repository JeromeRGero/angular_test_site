import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets.component';
import { NewpetComponent } from './newpet/newpet.component';
import { PetinfoComponent } from './petinfo/petinfo.component';
import { EditpetComponent } from './editpet/editpet.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    NewpetComponent,
    PetinfoComponent,
    EditpetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

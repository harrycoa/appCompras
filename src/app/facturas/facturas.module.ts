import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
// implementar paquetes del routing
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// importar dependencias http
import { HttpModule } from '@angular/http';
import { AddfraComponent } from './facturas/addfra/addfra.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [AddfraComponent],
  providers: []
})
export class FacturasModule { }

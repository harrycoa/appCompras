import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// implementar paquetes del routing
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// importar dependencias http
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { enviroment } from './config/firebase.config';
// for AngularFireAuth
import { AngularFireAuth } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { PresupuestosComponent } from './presupuestos/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { GuardService } from './servicios/guard.service';
import { FacturasModule } from './facturas/facturas.module'; // importamos el modulo
import { AddfraComponent } from './facturas/facturas/addfra/addfra.component';
import { UploadComponent } from './uploads/upload/upload.component';
import { LoadfileService } from './servicios/loadfile.service';
import { SubidaComponent } from './uploads/subida/subida.component';
import { ContratosComponent } from './uploads/contratos/contratos.component';
import { DetallesComponent } from './uploads/detalles/detalles.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  // Protegiendo las rutas con canactivate
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [GuardService] },
  { path: 'addprovee', component: AddproveeComponent, canActivate: [GuardService] },
  { path: 'addpres', component: AddpresComponent, canActivate: [GuardService] },
  { path: 'presupuestos', component: PresupuestosComponent, canActivate: [GuardService] },
  { path: 'registro', component: RegistroComponent },
  { path: 'editpres/:id', component: EditpresComponent, canActivate: [GuardService] },
  { path: 'inises', component: InisesComponent },
  { path: 'addfra', component: AddfraComponent },
  { path: 'uploads', component: UploadComponent },
  { path: 'contratos', component: ContratosComponent },
  // cualquier ruta que se escriba y no exista
  { path: '**', component: InicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddproveeComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    UploadComponent,
    SubidaComponent,
    ContratosComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FacturasModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ProveedoresService, PresupuestosService, AutenticacionService, GuardService, LoadfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

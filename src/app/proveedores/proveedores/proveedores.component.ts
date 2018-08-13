import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
// componentes reactive
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  campoBusqueda: FormControl;
  busqueda: string;
  proveedores: any[] = [];
  cargando: any = false;
  resultados: any = false;
  noresultados: any = false;

  constructor(private proveedoresService: ProveedoresService) {  }

  ngOnInit() {
   // this.proveedores = this.proveedoresService.getProveedores();
   // inicializamos nuestro formulario
   this.campoBusqueda = new FormControl();
   this.campoBusqueda.valueChanges
    .subscribe( term => {
      this.busqueda = term;
      this.cargando = true;
      if (this.busqueda.length !== 0) {
        this.proveedoresService.getProveedoresSearch(this.busqueda)
          .subscribe (proveedores => {
            this.proveedores = [];
            // tslint:disable-next-line:forin
            for (const id$ in proveedores) {
              const p = proveedores[id$];
              p.id$ = id$;
              this.proveedores.push(proveedores[id$]);
            }
            if (this.proveedores.length < 1 && this.busqueda.length >= 1) {
              this.noresultados = true;
            } else {
              this.noresultados = false;
            }
          });
          this.cargando = false;
          this.resultados = true;
      } else {
        this.proveedores = [];
        this.cargando = false;
        this.resultados = false;
      }

    });
  }

}

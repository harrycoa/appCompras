import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// importar el servicio
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  igv: any = 0;
  total: any = 0;

  proveedores: any[] = [];

  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestosService,
              private proveedoresService: ProveedoresService) {
        // LLAMAR A PRESUPUESTO DEL OTRO FORM
        this.proveedoresService.getProveedores()
          .subscribe(proveedores => {
          for (const id$ in proveedores) {
            const p = proveedores[id$];
            p.id$ = id$;
            this.proveedores.push(proveedores[id$]);
          }
      });
              }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({
      // inicializamos el objeto
      proveedor: ['', Validators.required ],
      fecha: ['', Validators.required ],
      // concepto mas de 10 caracteres
      concepto: ['', [Validators.required, Validators.minLength(10)] ],
      base: ['', Validators.required ],
      tipo: ['', Validators.required ],
      // igv: ['', Validators.required ],
      igv: this.igv,
     // total: ['', Validators.required ]
     total: this.total
    });
    this.onChanges();
  }

  onChanges(): void {
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.igv = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);

    });
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto)
        .subscribe(newpres => {

        });
    this.presupuestoForm.reset();
  }
  savePresupuesto() {
    const savePresupuesto =  {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      igv: this.presupuestoForm.get('igv').value,
      total: this.presupuestoForm.get('total').value
    };
    return savePresupuesto;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// importar el servicio
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  igv: any = 0;
  total: any = 0;
  id: string;

  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestosService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params
      .subscribe( parametros => {
        this.id = parametros['id'];
        this.presupuestoService.getPresupuesto(this.id)
          .subscribe  (presupuesto => this.presupuesto = presupuesto);
      });
   }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({
      // inicializamos el objeto
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      // concepto mas de 10 caracteres
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
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
    this.presupuestoService.putPresupuesto(this.presupuesto, this.id)
      .subscribe(newpres => {
          this.router.navigate(['/presupuestos']);
      });
    this.presupuestoForm.reset();
  }
  savePresupuesto() {
    const savePresupuesto = {
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

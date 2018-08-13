import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NgForm } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  // decorador viechild
  // @ViewChild('formpro') formpro: NgForm;

  proveedorForm: FormGroup;
  proveedor: any;

  provincias: string[] = ['cusco', 'arequipa', 'lima', 'puno', 'tacna', 'moquegua', 'ayacucho'];

  constructor(private pf: FormBuilder, private proveedorService: ProveedoresService) {
    /*
    this.proveedor = {
      nombre: '',
      cif: '',
      direccion: '',
      cp: '',
      localidad: '',
      provincia: '',
      telefono: null,
      email: '',
      contacto: ''
    };
    */

   }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required ],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required]
    });
  }
  onSubmit() {
    /* ngform
    this.proveedor.nombre = this.formpro.value.nombre;
    this.proveedor.cif = this.formpro.value.cif;
    this.proveedor.direccion = this.formpro.value.direccion;
    this.proveedor.cp = this.formpro.value.cp;
    this.proveedor.localidad = this.formpro.value.localidad;
    this.proveedor.provincia = this.formpro.value.provincia;
    this.proveedor.telefono = this.formpro.value.telefono;
    this.proveedor.email = this.formpro.value.email;
    this.proveedor.contacto = this.formpro.value.contacto;
    // una vez se envie se vacie
    this.formpro.reset();
    */
    this.proveedor = this.saveProveedor();
    this.proveedorService.postProveedor(this.proveedor)
      .subscribe(newpres => {

      });
    this.proveedorForm.reset();


  }
  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

}

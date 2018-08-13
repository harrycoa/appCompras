import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class ProveedoresService {

  provURL = 'https://comprasapp-a9b62.firebaseio.com/proveedores.json';
  proURL = 'https://comprasapp-a9b62.firebaseio.com/proveedores';

  /*
  proveedores: any = [
    {
      nombre: 'Telefónica',
      cif: 'B12345678',
      direccion: 'Paseo de la Castellana, 100',
      cp: '28.010',
      localidad: 'Madrid',
      provincia: 'Madrid',
      telefono: 911111111,
      email: 'info@telefonica.com',
      contacto: 'Juan Pérez'
    },
    {
      nombre: 'Iberdrola',
      cif: 'B87654321',
      direccion: 'Príncipe de Vergara, 200',
      cp: '28.015',
      localidad: 'Madrid',
      provincia: 'Madrid',
      telefono: 922222222,
      email: 'info@iberdrola.com',
      contacto: 'Laura Martínez'
    }
  ];*/

  constructor(private http: Http) { }

  postProveedor(proveedor: any) {
    const newprov = JSON.stringify(proveedor);
    const headers = new Headers({
      'ContentType': 'application/json'
    });
    return this.http.post(this.provURL, newprov, { headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      });
  }

  getProveedores() {
    return this.http.get(this.provURL)
      .map(
        res => res.json()
      );
  }

  getProveedor(id$: string) {
    const url = `${this.proURL}/${id$}.json`;
    return this.http.get(url)
      .map(res => res.json());
  }

  putProveedor(proveedor: any, id$: string) {
    const newpro = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.proURL}/${id$}.json`;
    return this.http.put(url, newpro, { headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      });
  }


  delPresupuesto(id$: string) {
    const url = `${this.proURL}/${id$}.json`;
    return this.http.delete(url)
      .map(res => res.json());
  }

  getProveedoresSearch (busqueda: string) {
    // url query firebase
    const url = `${ this.provURL }?orderBy="nombre"&startAt="${ busqueda }"&endAt="${ busqueda }\uf8ff"`;
    return this.http.get(url)
      .map (res => res.json());
  }

}

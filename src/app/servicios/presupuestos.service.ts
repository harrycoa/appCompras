import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class PresupuestosService {

  presURL = 'https://comprasapp-a9b62.firebaseio.com/presupuestos.json';
  preURL = 'https://comprasapp-a9b62.firebaseio.com/presupuestos';

  constructor(private http: Http ) { }

  postPresupuesto(presupuesto: any) {
    const newpres = JSON.stringify(presupuesto);
    const headers = new Headers({
      'ContentType': 'application/json'
    });
    return this.http.post(this.presURL, newpres, {headers})
      .map( res => {
        console.log(res.json());
        return res.json();
      });
  }
  getPresupuestos() {
    return this.http.get(this.presURL)
      .map(
          res => res.json()
      );
  }

  getPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url)
      .map( res => res.json());
  }

  putPresupuesto(presupuesto: any, id$: string) {
    const newpre = JSON.stringify(presupuesto);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, {headers})
      .map ( res => {
        console.log(res.json());
        return res.json();
      });
  }

  delPresupuesto (id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.delete( url )
      .map (res => res.json());
  }

}

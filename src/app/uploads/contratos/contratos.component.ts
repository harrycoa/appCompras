import { Component, OnInit } from '@angular/core';
import { LoadfileService } from '../../servicios/loadfile.service';
import { Archivo } from './../file.modal';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: FirebaseListObservable<Archivo[]>;

  constructor(private loadfileService: LoadfileService) { }

  ngOnInit() {
    // this.uploads = this.loadfileService.getUploads();
  }

}

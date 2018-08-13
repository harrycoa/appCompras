import { Injectable } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Archivo } from '../uploads/file.modal';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class LoadfileService {

  private basePath  = '/uploads';
  uploads: FirebaseListObservable<Archivo[]>;

  constructor(public angularFireDatabase: AngularFireDatabase) { }

  pushUpload(upload: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        // (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  private saveFileData(upload: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }

  getUploads() {
    // this.uploads = this.angularFireDatabase.list(this.basePath);
    // return this.uploads;
  }

  deleteUpload(upload: Archivo) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

  deleteFileData(key: string) {
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/`).delete();
  }


}

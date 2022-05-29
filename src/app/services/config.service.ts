import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { firebaseConfig } from './config';
/* config example
const firebaseConfig = {
  apiKey: "apikey-string-hashing",
  authDomain: "project-name.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project-bucket.appspot.com",
  messagingSenderId: "id",
  appId: "app-id"
};
export { firebaseConfig }
*/

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public static getFirestoreApp() {
    return getFirestore(app)
  }
}

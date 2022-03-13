import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { User } from '../models/user';
import { ConfigService } from './config.service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createUser(user: User): void {
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
  }
}

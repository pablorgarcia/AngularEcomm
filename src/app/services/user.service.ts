import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { User } from '../models/user';
import { ConfigService } from './config.service';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async login({email, password}): Promise<any> {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sessionStorage
          .setItem('user', JSON.stringify({
            uid: user.uid,
            token: user['accessToken']
          }))
          return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      return user;
  }

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

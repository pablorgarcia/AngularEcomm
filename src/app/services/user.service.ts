import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { BehaviorSubject, Observable } from 'rxjs';

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor() {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('user'))
    );
    this.user$ = this.userSubject.asObservable();
  }

  async login({email, password}): Promise<any> {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sessionStorage
          .setItem('user', JSON.stringify({
            email,
            username: email.split('@')[0],
            uid: user.uid,
            token: user['accessToken']
          }));
          this.userSubject.next(user as any);
          return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      return user;
  }

  createUser(user: User, isCustomer = false): void {
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user['role'] = { admin: !isCustomer };
          auth.updateCurrentUser(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }
}

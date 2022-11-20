import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, confirmPasswordReset } from "firebase/auth";
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Customer } from '../models/customer';

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;
  private userCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth
    ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('user'))
    );
    this.user$ = this.userSubject.asObservable();

    this.userCollection = this.afs.collection<Customer>('Customer')
  }

  async login({email, password}): Promise<any> {
    const auth = getAuth();
    let user = await signInWithEmailAndPassword(auth, email, password);
    let userData = user.user;
    const customer = await this.userCollection
      .get()
      .toPromise()
      .then(snapshot => snapshot.docs.map(doc => ({id: doc?.id, ...doc?.data()})).find(item => item['userId'] === user.user.uid)
    );
    if (customer) {
      customer['lastsign'] = new Date(userData.metadata.lastSignInTime).getTime();
      this.userCollection.doc(customer.id).update(customer);
    }
    userData['isCustomer'] = Boolean(customer);
    sessionStorage
      .setItem('user', JSON.stringify({
        email,
        username: email.split('@')[0],
        uid: userData.uid,
        customer: Boolean(customer),
        token: userData['accessToken'],
        isCustomer: Boolean(customer)
      })
    );
    this.userSubject.next(userData as any);

    return userData;
  }

  createUser(user: User): void {
    this.afauth.createUserWithEmailAndPassword(user.email, user.password)
      .then(async (userCredential: any) => {
        delete user.password;
        delete user['confirmPassword'];
        this.userCollection.add(
          {
            ...user,
            created: this.changeDateToTime(userCredential.user.metadata.creationTime),
            lastsign: this.changeDateToTime(userCredential.user.metadata.lastSignInTime),
            userId: userCredential.user.uid
          }
        )
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage })
        // ..
    });
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user'))
  }

  private changeDateToTime(date: string): number {
    return new Date(date).getTime();
  }
}

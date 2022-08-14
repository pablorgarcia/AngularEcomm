import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  loadMessages() {
    this.itemsCollection = this.afs.collection<any>('Chats', ref => ref.orderBy('date', 'asc'));
    return this.itemsCollection.valueChanges();
  }

  addMessage(msg: string) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      sessionStorage.setItem('user', JSON.stringify({
        uid: 'BOTH_USER',
        name: 'both@email.com',
        token: 'BOTH_TOKEN'
      }))
      user = JSON.parse(sessionStorage.getItem('user'));
    }
    let message: any = {
      name: (user.email || user.name).split('@')[0],
      msg,
      date: new Date().getTime(),
      uid: user.uid
    };
    this.itemsCollection.add(message);
  }

}

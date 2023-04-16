import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { Customer } from '../models/customer';
import { ConfigService } from './config.service';
import { async } from '@firebase/util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {

  private customerAddressCollection = collection( ConfigService.getFirestoreApp(), 'CustomerAddress');
  private customerBillingAddressesCollection = collection( ConfigService.getFirestoreApp(), 'CustomerBillingAddress');
  private static customerAddress: any[];
  private static customerBillingAddresses: any[];

  constructor() { }

  async getCustomerAddress() {
    if (!CustomerAddressService.customerAddress) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Traemos los productos que están en la DB
      const customerAddressSnapshot = await getDocs(this.customerAddressCollection) as any;
      const customerAddressList = customerAddressSnapshot.docs
        .map(doc => ({id: doc?.id, ...doc?.data()}))
        .filter(({userId}) => userId === user.uid);
        CustomerAddressService.customerAddress = customerAddressList as [];
    }

    return CustomerAddressService.customerAddress;
  }

  async getCustomerBillingAddresses() {
    if (!CustomerAddressService.customerBillingAddresses) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Traemos los productos que están en la DB
      const customerBillingAddressesSnapshot = await getDocs(this.customerBillingAddressesCollection) as any;
      const customerBillingAddressesList = customerBillingAddressesSnapshot.docs
        .map(doc => ({id: doc?.id, ...doc?.data()}))
        .filter(({userId}) => userId === user.uid);
        CustomerAddressService.customerBillingAddresses = customerBillingAddressesList as [];
    }

    return CustomerAddressService.customerBillingAddresses;
  }

  async setCustomerAddress(address) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    address.userId = user?.uid;
    await addDoc(this.customerAddressCollection, address);
    CustomerAddressService.clearAddresses();
  }

  async setCustomerBillingAddress(address) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    address.userId = user?.uid;
    await addDoc(this.customerBillingAddressesCollection, address);
    CustomerAddressService.clearBillingAddresses();
  }

  private static clearAddresses() {
    CustomerAddressService.customerAddress = null;
  }

  private static clearBillingAddresses() {
    CustomerAddressService.customerBillingAddresses = null;
  }

}

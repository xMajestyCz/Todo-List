import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, doc, docData, getDoc, setDoc, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getDocument<tipo>(path: string) {
    const document = doc(this.firestore, path) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document);
  }

  getDocumentById<T>(path: string, id: string): Observable<T> {
    const document = doc(this.firestore, `${path}/${id}`);
    return docData(document, { idField: 'id' }) as Observable<T & { id: string }>;
  }
  
  getDocumentChanges<tipo>(path: string) {
    const document = doc(this.firestore, path);
    return docData(document) as Observable<tipo>;
  }

  getCollectionChanges<tipo>(path: string) {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  createDocument(data: any, path: string) {
    const document = doc(this.firestore, path);
    return setDoc(document, data);
  }

  createDocumentWithId(data: any, path: string, id: string) {
    const document = doc(this.firestore, `${path}/${id}`);
    return setDoc(document, data);
  }

  async updateDocumentWithId(data: any, path: string, id: string) {
    const document = doc(this.firestore, `${path}/${id}`);
    return updateDoc(document, data);
  }

  async updateDocument(data: any, path: string) {
    const document = doc(this.firestore, path);
    return updateDoc(document, data)
  }

  deleteDocumentWithId(path: string, id: string) {
    const document = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(document);
  }

  createIdDoc() {
    return uuidv4()
  }
}

import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit{

  constructor(private angFireStore: AngularFirestore) { }

  ngOnInit(): void {
      
  }

  loadData() {
    return this.angFireStore
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;

            return { id, data };
          });
        })
      );
  }

  loadCategoryData(categoryId) {
    return this.angFireStore
      .collection('posts', ref => ref.where('category.categoryId', '==', categoryId))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;

            return { id, data };
          });
        })
      );
  }
  
  loadSinglePost(postd) {
    return this.angFireStore.doc(`posts/${postd}`).valueChanges()
  }
}

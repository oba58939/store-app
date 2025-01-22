import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';  // Firestore の関数をインポート
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // ngModelを使うために追加
import { CommonModule } from '@angular/common';


interface Store {
  id: string
  name: string;
  location: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [BrowserModule, CommonModule, FormsModule, ResultComponent], 
})
export class AppComponent implements OnInit{
  title = '在庫管理システム';
  keyword = ''
  store: { id: string, name: string }[] = []; // 店舗情報を格納する配列
  selectedStore: string = ''; // 選択した店舗のID
selectedJanru: string = '';


constructor() {
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  console.log('Firestore initialized', db);
}
db: any; 

ngOnInit(): void {
  try{
  this.loadStoreData();  // 店舗情報をFirestoreからロード
  }catch (error) {
    console.error('Error in ngOnInit:', error);
  }
}

async loadStoreData() {
  const storesCollection = collection(this.db, 'stores');
  const storeSnapshot = await getDocs(storesCollection);
  const storeList: Store[] = storeSnapshot.docs.map(doc => doc.data() as Store);  // 型を指定
  this.store = storeList;
}

// 店舗選択時の処理
onStoreSelect(storeId: string) {
  this.selectedStore = storeId;
  console.log(`選択された店舗ID: ${storeId}`);
}};

export const routes: Routes = [
  { path: 'result-component', component: ResultComponent },
]


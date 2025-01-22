import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';  // Firestoreの関数をインポート
import { FormsModule } from '@angular/forms';  // ngModelを使うために追加
import { CommonModule } from '@angular/common';

interface Store {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],  // CommonModule と FormsModule をインポート
})
export class AppComponent implements OnInit {
  title = '在庫管理システム';
  keyword = '';
  store: { id: string, name: string }[] = [];  // 店舗情報を格納する配列
  selectedStore: string = '';  // 選択した店舗のID
  selectedProduct: string = '';

  db: any;  // dbをクラスのプロパティとして宣言

  constructor() {
    // Firestoreの初期化
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    console.log('Firestore initialized', this.db);
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.fetchStores();
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  }

  async fetchStores(): Promise<void> {
    const storeCol = collection(this.db, 'store'); // コレクション名を確認
    const storeSnapshot = await getDocs(storeCol);

    this.store = storeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as { id: string; name: string }[];
    console.log('取得した店舗データ:', this.store);
  }

  // 店舗情報をFirestoreからロードする関数
  async loadStoreData() {
    try {
      const storesCollection = collection(this.db, 'store');
      const storeSnapshot = await getDocs(storesCollection);
      const storeList: Store[] = storeSnapshot.docs.map(doc => doc.data() as Store);
      this.store = storeList;
    } catch (error) {
      console.error('Error loading store data:', error);
    }
  }

  // 店舗選択時の処理
  onStoreSelect(storeId: string) {
    this.selectedStore = storeId;
    console.log(`選択された店舗ID: ${storeId}`);
  }
}

// ルートの設定
export const routes: Routes = [
  { path: 'result-component', component: ResultComponent },
];

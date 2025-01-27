import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  imports: [CommonModule, FormsModule, AngularFirestoreModule],
  standalone: true,
  providers: [AngularFirestore], // 必要に応じて追加
})
export class ResultComponent implements OnInit {
  products: any[] = []; // Firebaseから取得した商品データ
  searchQuery: string = ''; // 検索キーワード

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    // Firebaseから商品情報を取得
    this.getProducts();
  }

  // Firebaseから商品情報を取得するメソッド
  getProducts(): void {
    this.firestore.collection('products').valueChanges().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error fetching products:', err),
    });
  }
  

  // 検索機能: 検索ワードで商品名または著者名をフィルタリング
  filterProducts() {
    return this.products.filter(product => {
      // タイトルまたは著者名に検索ワードが含まれているか
      return product.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
             product.author?.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}

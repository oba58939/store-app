import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '在庫管理システム';
  keyword = ''

store: { id: number, name: string }[] = [];
selectedStore: string = '';
selectedJanru: string = '';

constructor() {
  const app = initializeApp(environment.firebaseConfig);
  const db = getFirestore(app);
  console.log('Firestore initialized', db);
}

}
;

export const routes: Routes = [
  { path: 'result-component', component: ResultComponent }
];
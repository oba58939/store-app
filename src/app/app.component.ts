import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '在庫管理システム';
  keyword = ''
  
selectedStore: string = '';
selectedJanru: string = '';

}

export const routes: Routes = [{ path: 'result-component', component: ResultComponent },];


import {Component, OnInit} from '@angular/core';
import {ShoppingService} from './shopping-list/shopping.service';
import {AuthService} from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.autoSigIn();
  }
}

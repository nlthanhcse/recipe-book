import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../shared/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !(!user); // !(!false) = false;
    });
  }

  public getIsAuthenticated() {
    return this.isAuthenticated;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  public saveData() {
    this.dataStorageService.saveData();
  }

  public fetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
}

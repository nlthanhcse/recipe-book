import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('authForm') authForm: NgForm;
  isSignIn = false;
  isProcessing = false;
  error = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  onChanges() {
    this.error = null;
  }

  public submit() {
    this.isProcessing = true;
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authen: Observable<any>;
    if (this.isSignIn) {
      authen = this.authService.signIn(email, password);
    } else {
      authen = this.authService.signUp(email, password);
    }

    authen.subscribe(
      responseData => {
        console.log(responseData);
        this.isProcessing = false;
        this.router.navigate(['../recipe']);
      },
      responseError => {
        console.log(responseError);
        this.error = responseError;
        this.isProcessing = false;
      }
    );
  }

  public switch() {
    this.isSignIn = !this.isSignIn;
  }
}

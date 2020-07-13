import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';

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

  constructor(private authService: AuthService) {
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
    this.authService.signUp(email, password)
      .subscribe(
        responseData => {
          console.log(responseData);
          this.isProcessing = false;
        },
        responseError => {
          this.error = responseError.error.error.message;
          switch (this.error) {
            case 'EMAIL_EXISTS':
              this.error = 'This email already exists!';
              break;
          }
          console.log(responseError);
          this.isProcessing = false;
        }
      );
  }

  public switch() {
    this.isSignIn = !this.isSignIn;
  }
}

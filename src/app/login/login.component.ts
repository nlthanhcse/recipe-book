import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;
  isSignIn = false;
  isProcessing = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
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
        error => {
          console.log(error);
          this.isProcessing = false;
        }
      );
  }

  public switch() {
    this.isSignIn = !this.isSignIn;
  }
}

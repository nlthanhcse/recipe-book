import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;
  isSignIn = false;
  constructor() { }

  ngOnInit(): void {
  }

  public submit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

  }

  public switch() {
    this.isSignIn = !this.isSignIn;
  }
}

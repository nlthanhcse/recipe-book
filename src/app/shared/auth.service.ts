import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

interface ResponsePayload {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private autoSignOutTimer = null;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public signUp(e: string, p: string) {
    return this.httpClient
      .post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGSqAla2NbkqA6G5F2Cpm2MBXlYoaWhpY',
        {
          email: e,
          password: p,
          returnSecureToken: true
        }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }


  public signIn(e: string, p: string) {
    return this.httpClient
      .post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGSqAla2NbkqA6G5F2Cpm2MBXlYoaWhpY',
        {
          email: e,
          password: p,
          returnSecureToken: true
        }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  public signOut() {
    this.user.next(null);
    localStorage.removeItem('user');
    if (this.autoSignOutTimer) {
      clearTimeout(this.autoSignOutTimer);
    }
    this.router.navigate(['/auth']);
  }

  public autoSigIn() {
    const userFromLocalStorage: {
      email: string,
      id: string,
      // tslint:disable-next-line:variable-name
      _token: string,
      // tslint:disable-next-line:variable-name
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('user'));

    if (userFromLocalStorage) {
      const loadedUser = new User(userFromLocalStorage.email,
        userFromLocalStorage.id, userFromLocalStorage._token,
        new Date(userFromLocalStorage._tokenExpirationDate));
      this.user.next(loadedUser);
      this.autoSignOut(loadedUser._tokenExpirationDate.getTime() - new Date().getTime());
      this.router.navigate(['/recipe']);
    }
  }

  public autoSignOut(expirationDate: number) {
    this.autoSignOutTimer = setTimeout(
      () => {
        this.signOut();
      }, expirationDate);
  }

  public saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.saveUserToLocalStorage(user);
    this.autoSignOut(expiresIn * 1000);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

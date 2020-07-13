import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  public signUp(e: string, p: string) {
    return this.httpClient
      .post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        {
          email: e,
          password: p,
          returnSecureToken: true
        });
  }
}

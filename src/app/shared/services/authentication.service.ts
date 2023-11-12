import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthenticationParams, ChangeEmailParams, RefreshTokenParams} from "../types/authentication.types";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(params: AuthenticationParams): Observable<{}> {
    return this.httpClient.post<{}>(`${environment.apiQuizz}/authenticate/login`, params);
  }

  resetEmail(params: ChangeEmailParams): Observable<{}> {
    return this.httpClient.post<{}>(`${environment.apiQuizz}/authenticate/reset`, params);
  }

  refreshToken(params: RefreshTokenParams): Observable<{}> {
    const body = {
      password: params.password
    };

    const headers = new HttpHeaders({
      Authorization: params.authorization
    });

    return this.httpClient.post<{}>(`${environment.apiQuizz}/authenticate/change`, body, {
      headers,
      params: {
        resetCode: params.resetCode
      }
    });
  }
}

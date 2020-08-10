import { Injectable } from '@angular/core';
import { MsalService } from './msal.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthenticationResult } from '@azure/msal-browser';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {

    constructor(
        private auth: MsalService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const scopes = this.auth.getScopesForEndpoint(req.url);
        if (scopes === null || scopes === []) {
            return next.handle(req);
        }
        return from(
            this.auth.acquireTokenSilent(scopes)
                .then((token: string) => {
                    const authHeader = `Bearer ${token}`;
                    return req.clone({
                        setHeaders: {
                            Authorization: authHeader,
                        }
                    });
                })
        )
        .pipe(
            mergeMap(nextReq => next.handle(nextReq))
        );
    }
}

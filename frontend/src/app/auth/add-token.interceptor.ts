import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.state().token;

  if (token) {
    const req_with_token = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(req_with_token);
  } else {
    return next(req);
  }
};

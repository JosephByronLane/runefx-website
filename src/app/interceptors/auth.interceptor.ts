import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Auth interceptor called');

  const requestWithAuth = req.clone({
    withCredentials: true,
  })
  return next(req);
};

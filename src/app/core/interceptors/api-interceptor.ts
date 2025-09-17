import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "../../../environments/environment";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: req.url.startsWith("http") ? req.url : environment.apiUrl + req.url
  });

  return next(apiReq);
};


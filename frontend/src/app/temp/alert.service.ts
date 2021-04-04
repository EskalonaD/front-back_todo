import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts$ = new Subject<string>();

  constructor() { }

  addError(error: string): void {
    this.alerts$.next(error);
  }

  getError(): Observable<string> {
    return this.alerts$.asObservable();
  }
}
